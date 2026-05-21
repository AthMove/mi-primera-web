"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();

    const channel = supabase
      .channel("feed-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feed_posts" },
        () => loadPosts()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feed_comments" },
        () => loadPosts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from("feed_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      setPosts([]);
      setLoading(false);
      return;
    }

    setPosts(data);

    const { data: commentsData } = await supabase
      .from("feed_comments")
      .select("*")
      .order("created_at", { ascending: true });

    const grouped: Record<string, any[]> = {};

    for (const comment of commentsData || []) {
      if (!grouped[comment.post_id]) {
        grouped[comment.post_id] = [];
      }

      grouped[comment.post_id].push(comment);
    }

    setComments(grouped);
    setLoading(false);
  };

  const createPost = async (image?: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Sign in first");
      return;
    }

    if (!content.trim() && !image) return;

    const { error } = await supabase.from("feed_posts").insert([
      {
        user_id: user.id,
        user_email: user.email,
        content: content.trim(),
        image: image || null,
      },
    ]);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    setContent("");
    await loadPosts();
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("feed-images")
        .upload(fileName, file);

      if (error) {
        console.log(error);
        alert(error.message);
        return;
      }

      const { data } = supabase.storage
        .from("feed-images")
        .getPublicUrl(fileName);

      await createPost(data.publicUrl);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const likePost = async (post: any) => {
    await supabase
      .from("feed_posts")
      .update({
        likes: (post.likes || 0) + 1,
      })
      .eq("id", post.id);

    await loadPosts();
  };

  const addComment = async (postId: string) => {
    const text = commentInputs[postId]?.trim();

    if (!text) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Sign in first");
      return;
    }

    const { error } = await supabase.from("feed_comments").insert([
      {
        post_id: postId,
        user_id: user.id,
        user_email: user.email,
        comment: text,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setCommentInputs((current) => ({
      ...current,
      [postId]: "",
    }));

    await loadPosts();
  };

  const deleteComment = async (commentId: string) => {
    const confirmDelete = confirm("Delete this comment?");
    if (!confirmDelete) return;

    await supabase.from("feed_comments").delete().eq("id", commentId);
    await loadPosts();
  };

  return (
    <main style={pageStyle} className="feed-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>ATHMOV FEED</p>

        <h1 style={titleStyle} className="feed-title">
          Community
        </h1>

        <p style={subtitleStyle}>Athletes. Gear. Lifestyle.</p>
      </section>

      <section style={createStyle}>
        <textarea
          placeholder="Share something with the community..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textareaStyle}
        />

        <div style={actionsStyle}>
          <label style={uploadButtonStyle}>
            {uploading ? "..." : "Add image"}

            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={uploadImage}
            />
          </label>

          <button onClick={() => createPost()} style={buttonStyle}>
            Publish
          </button>
        </div>
      </section>

      {loading ? (
        <p style={loadingStyle}>Loading feed...</p>
      ) : (
        <section style={feedStyle}>
          {posts.map((post) => (
            <article key={post.id} style={cardStyle} className="feed-card">
              <div style={cardHeaderStyle}>
                <div style={avatarStyle}>
                  {post.user_email?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p style={emailStyle}>{post.user_email}</p>

                  <p style={dateStyle}>
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {post.content && <p style={contentStyle}>{post.content}</p>}

              {post.image && (
                <div style={imageWrapperStyle}>
                  <Image
                    src={post.image}
                    alt="Feed image"
                    fill
                    sizes="800px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}

              <div style={footerStyle}>
                <button onClick={() => likePost(post)} style={likeButtonStyle}>
                  ♥️ {post.likes || 0}
                </button>
              </div>

              <div style={commentsStyle}>
                <p style={commentsTitleStyle}>
                  Comments ({comments[post.id]?.length || 0})
                </p>

                <div style={commentsListStyle}>
                  {(comments[post.id] || []).map((comment) => (
                    <div key={comment.id} style={commentStyle}>
                      <div>
                        <p style={commentEmailStyle}>{comment.user_email}</p>
                        <p style={commentTextStyle}>{comment.comment}</p>
                      </div>

                      <button
                        onClick={() => deleteComment(comment.id)}
                        style={deleteButtonStyle}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div style={commentInputRowStyle}>
                  <input
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs((current) => ({
                        ...current,
                        [post.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addComment(post.id);
                      }
                    }}
                    placeholder="Write a comment..."
                    style={commentInputStyle}
                  />

                  <button
                    onClick={() => addComment(post.id)}
                    style={commentButtonStyle}
                  >
                    Send
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <style>{`
        .feed-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .feed-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 90px rgba(0,0,0,0.08);
        }

        @media (max-width: 700px) {
          .feed-page {
            padding: 120px 18px 34px !important;
          }

          .feed-title {
            font-size: 48px !important;
            letter-spacing: -2px !important;
          }
        }
      `}</style>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #f8f8f4, #eeeeea)",
  padding: "70px 20px",
  fontFamily: "Inter, sans-serif",
};

const heroStyle = {
  maxWidth: "760px",
  margin: "0 auto 40px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "72px",
  lineHeight: 1,
  margin: "12px 0",
  letterSpacing: "-4px",
};

const subtitleStyle = {
  color: "#666",
};

const createStyle = {
  maxWidth: "760px",
  margin: "0 auto 40px",
  background: "#fff",
  padding: "24px",
  borderRadius: "30px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
};

const textareaStyle = {
  width: "100%",
  minHeight: "120px",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "24px",
  padding: "18px",
  resize: "none" as const,
  outline: "none",
  fontSize: "15px",
};

const actionsStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "18px",
};

const uploadButtonStyle = {
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "12px 18px",
  cursor: "pointer",
  fontWeight: 700,
};

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "12px 22px",
  cursor: "pointer",
  fontWeight: 800,
};

const loadingStyle = {
  textAlign: "center" as const,
  marginTop: "80px",
};

const feedStyle = {
  maxWidth: "760px",
  margin: "0 auto",
  display: "grid",
  gap: "26px",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "34px",
  overflow: "hidden",
  boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
};

const cardHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "24px 24px 0",
};

const avatarStyle = {
  width: "52px",
  height: "52px",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
};

const emailStyle = {
  margin: 0,
  fontWeight: 700,
};

const dateStyle = {
  margin: "4px 0 0",
  fontSize: "12px",
  opacity: 0.5,
};

const contentStyle = {
  padding: "20px 24px",
  lineHeight: 1.7,
};

const imageWrapperStyle = {
  position: "relative" as const,
  width: "100%",
  height: "520px",
  background: "#f3f3f0",
};

const footerStyle = {
  padding: "20px 24px 0",
};

const likeButtonStyle = {
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "10px 18px",
  cursor: "pointer",
  fontWeight: 800,
};

const commentsStyle = {
  padding: "18px 24px 26px",
};

const commentsTitleStyle = {
  fontSize: "13px",
  fontWeight: 900,
  opacity: 0.55,
  marginBottom: "12px",
};

const commentsListStyle = {
  display: "grid",
  gap: "10px",
  marginBottom: "14px",
};

const commentStyle = {
  background: "#f7f7f3",
  borderRadius: "18px",
  padding: "12px 14px",
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
};

const commentEmailStyle = {
  fontSize: "12px",
  fontWeight: 800,
  margin: 0,
};

const commentTextStyle = {
  fontSize: "14px",
  color: "#555",
  marginTop: "5px",
  marginBottom: 0,
};

const deleteButtonStyle = {
  border: "none",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  width: "24px",
  height: "24px",
  cursor: "pointer",
  flexShrink: 0,
};

const commentInputRowStyle = {
  display: "flex",
  gap: "10px",
};

const commentInputStyle = {
  flex: 1,
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: "999px",
  padding: "12px 16px",
  outline: "none",
  background: "#f7f7f3",
};

const commentButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "0 18px",
  fontWeight: 800,
  cursor: "pointer",
};