import { supabase } from "@/lib/supabase";

export const createNotification = async ({
  user_id,
  title,
  message,
  link,
  type = "order",
}: {
  user_id: string;
  title: string;
  message: string;
  link?: string;
  type?: string;
}) => {
  const { error } = await supabase.from("notifications").insert([
    {
      user_id,
      type,
      title,
      message,
      link: link || null,
      read: false,
    },
  ]);

  if (error) {
    console.log("CREATE NOTIFICATION ERROR:", error);
  }
};