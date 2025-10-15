import * as Notifications from "expo-notifications";

interface NotificationProps {
  title: string;
  body: string;
  time: number;
}

export default async function NotificationPush({
  title,
  body,
  time,
}: NotificationProps) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: { seconds: time, channelId: "urgent" },
  });
}
