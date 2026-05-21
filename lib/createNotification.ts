import { supabase } from "@/lib/supabase";

type NotificationPayload = {
  user_id: string;
  title: string;
  message: string;
  link?: string;
};

export const createNotification = async ({
  user_id,
  title,
  message,
  link,
}: NotificationPayload) => {
  try {
    await supabase.from("notifications").insert([
      {
        user_id,
        title,
        message,
        link: link || null,
        is_read: false,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};