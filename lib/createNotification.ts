import { supabase } from "@/lib/supabase";

export const createNotification = async ({
  user_id,
  title,
  message,
  link,
  type = "general",
}: {
  user_id: string;
  title: string;
  message: string;
  link?: string;
  type?: string;
}) => {
  if (!user_id || !title || !message) {
    console.error("CREATE NOTIFICATION ERROR: missing required fields");
    return;
  }

  const { error } = await supabase.from("notifications").insert([
    {
      user_id,
      type,
      title,
      message,
      link: link || null,
      is_read: false,
    },
  ]);

  if (error) {
    console.error("CREATE NOTIFICATION ERROR:", error.message);
  }
};