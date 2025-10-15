import * as Notifications from "expo-notifications";

interface NotificationProps {
  title: string;
  body: string;
  time: number;
  phone?: string;
  text?: string;
}

export default async function NotificationPush({
  title,
  body,
  time,
  phone = "5491140875898",
  text = "",
}: NotificationProps) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { phone, text },
    },
    trigger: { seconds: time, channelId: "urgent" },
  });
}
