"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function FeedPage() {
  const router = useRouter();

  const [posts, setPosts] = useState<any[]>([]);
  const [featuredDrops, setFeaturedDrops] = useState<any[]>([]);
  const [recentDrops, setRecentDrops] = useState<any[]>([]);
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();

    const channel = supabase
      .channel("feed-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feed_posts" },
        loadFeed
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feed_comments" },
        loadFeed
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        loadFeed
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadFeed = async () => {
    const { data: postData } = await supabase
      .from("feed_posts")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: commentsData } = await supabase
      .from("feed_comments")
      .select("*")
      .order("created_at", { ascending: true });

    const { data: featured } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .eq("sold", false)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3);

    const { data: recent } = await supabase
      .from("products")
      .select("*")
      .eq("moderation_status", "approved")
      .eq("sold", false)
      .order("created_at", { ascending: false })
      .limit(6);

    const grouped: Record<string, any[]> = {};

    for (const comment of commentsData || []) {
      if (!grouped[comment.post_id]) grouped[comment.post_id] = [];
      grouped[comment.post_id].push(comment);
    }

    setPosts(postData || []);
    setComments(grouped);
    setFeaturedDrops(featured || []);
    setRecentDrops(recent || []);
    setLoading(false);
  };

  const createPost = async (image?: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión");
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
      alert(error.message);
      return;
    }

    setContent("");
    await loadFeed();
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
      .update({ likes: (post.likes || 0) + 1 })
      .eq("id", post.id);

    await loadFeed();
  };

  const addComment = async (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión");
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

    await loadFeed();
  };

  const deleteComment = async (commentId: string) => {
    const confirmDelete = confirm("¿Eliminar este comentario?");
    if (!confirmDelete) return;

    await supabase.from("feed_comments").delete().eq("id", commentId);
    await loadFeed();
  };

  const safeImage = (src?: string) => {
    return src?.startsWith("http") || src?.startsWith("/") ? src : "/logo.png";
  };

  return (
    <main style={pageStyle} className="feed-page">
      <section style={heroStyle}>
        <p style={eyebrowStyle}>FEED ATHMOV</p>

        <h1 style={titleStyle} className="feed-title">
          Drops y comunidad
        </h1>

        <p style={subtitleStyle}>
          Material deportivo premium, drops seleccionados y novedades de la
          comunidad.
        </p>
      </section>

      {featuredDrops.length > 0 && (
        <section style={featuredSectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>SELECCIÓN ATHMOV</p>
              <h2 style={sectionTitleStyle}>Drops destacados</h2>
            </div>

            <button
              onClick={() => router.push("/products")}
              style={smallButtonStyle}
            >
              Ver todo →
            </button>
          </div>

          <div style={featuredGridStyle} className="feed-featured-grid">
            {featuredDrops.map((product) => (
              <article
                key={product.id}
                style={featuredCardStyle}
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <Image
                  src={safeImage(product.image)}
                  alt={product.title || "Producto"}
                  fill
                  sizes="33vw"
                  style={{ objectFit: "cover" }}
                />

                <div style={featuredOverlayStyle}>
                  <p style={featuredBrandStyle}>{product.brand || "ATHMOV"}</p>
                  <h3 style={featuredTitleStyle}>{product.title}</h3>
                  <p style={featuredPriceStyle}>€{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section style={recentSectionStyle}>
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>ÚLTIMOS PRODUCTOS</p>
            <h2 style={sectionTitleStyle}>Nuevo material</h2>
          </div>
        </div>

        <div style={recentGridStyle}>
          {recentDrops.map((product) => (
            <article
              key={product.id}
              style={dropCardStyle}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <div style={dropImageStyle}>
                <Image
                  src={safeImage(product.image)}
                  alt={product.title || "Producto"}
                  fill
                  sizes="220px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={dropContentStyle}>
                <p style={dropBrandStyle}>{product.brand || "ATHMOV"}</p>
                <h3 style={dropTitleStyle}>{product.title}</h3>
                <p style={dropPriceStyle}>€{product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={createStyle}>
        <p style={createEyebrowStyle}>PUBLICACIÓN DE LA COMUNIDAD</p>

        <textarea
          placeholder="Comparte un drop, un outfit, un momento de partido o una opinión sobre material deportivo..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textareaStyle}
        />

        <div style={actionsStyle}>
          <label style={uploadButtonStyle}>
            {uploading ? "Subiendo..." : "Añadir imagen"}

            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={uploadImage}
            />
          </label>

          <button onClick={() => createPost()} style={buttonStyle}>
            Publicar
          </button>
        </div>
      </section>

      {loading ? (
        <p style={loadingStyle}>Cargando feed...</p>
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
                    src={safeImage(post.image)}
                    alt="Imagen del feed"
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
                  Comentarios ({comments[post.id]?.length || 0})
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
                    placeholder="Escribe un comentario..."
                    style={commentInputStyle}
                  />

                  <button
                    onClick={() => addComment(post.id)}
                    style={commentButtonStyle}
                  >
                    Enviar
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

        @media (max-width: 900px) {
          .feed-featured-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .feed-page {
            padding: 120px 18px 34px !important;
          }

          .feed-title {
            font-size: 46px !important;
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
  maxWidth: "1200px",
  margin: "0 auto 42px",
};

const eyebrowStyle = {
  fontSize: "12px",
  letterSpacing: "3px",
  opacity: 0.5,
};

const titleStyle = {
  fontSize: "76px",
  lineHeight: 1,
  margin: "12px 0",
  letterSpacing: "-4px",
};

const subtitleStyle = {
  color: "#666",
  fontSize: "17px",
};

const featuredSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 54px",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "18px",
  marginBottom: "24px",
};

const sectionTitleStyle = {
  fontSize: "42px",
  margin: 0,
  letterSpacing: "-2px",
};

const smallButtonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "12px 18px",
  fontWeight: 900,
  cursor: "pointer",
};

const featuredGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "22px",
};

const featuredCardStyle = {
  position: "relative" as const,
  height: "420px",
  borderRadius: "34px",
  overflow: "hidden",
  cursor: "pointer",
  background: "#111",
};

const featuredOverlayStyle = {
  position: "absolute" as const,
  inset: 0,
  padding: "28px",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "flex-end",
  background: "linear-gradient(to top, rgba(0,0,0,0.74), rgba(0,0,0,0.05))",
  color: "#fff",
};

const featuredBrandStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.75,
};

const featuredTitleStyle = {
  fontSize: "30px",
  margin: "8px 0 10px",
  letterSpacing: "-1px",
};

const featuredPriceStyle = {
  fontSize: "24px",
  fontWeight: 900,
};

const recentSectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto 54px",
};

const recentGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "18px",
};

const dropCardStyle = {
  background: "#fff",
  borderRadius: "28px",
  overflow: "hidden",
  cursor: "pointer",
  border: "1px solid rgba(0,0,0,0.06)",
};

const dropImageStyle = {
  position: "relative" as const,
  height: "210px",
  background: "#f3f3f0",
};

const dropContentStyle = {
  padding: "18px",
};

const dropBrandStyle = {
  fontSize: "10px",
  letterSpacing: "2px",
  opacity: 0.45,
};

const dropTitleStyle = {
  fontSize: "20px",
  margin: "8px 0 10px",
};

const dropPriceStyle = {
  fontSize: "20px",
  fontWeight: 900,
};

const createStyle = {
  maxWidth: "760px",
  margin: "0 auto 40px",
  background: "#fff",
  padding: "24px",
  borderRadius: "30px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
};

const createEyebrowStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  opacity: 0.45,
  marginBottom: "12px",
  fontWeight: 900,
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
  boxSizing: "border-box" as const,
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