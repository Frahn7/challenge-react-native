import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

let responseSub: Notifications.Subscription | undefined;

export function registerNotificationResponse() {
  responseSub = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data = response.notification.request.content.data as {
        phone?: string;
        text?: string;
      };
      if (data?.phone && data?.text) {
        openWhatsApp(data.phone, data.text);
      }
    }
  );
}

export function unregisterNotificationResponse() {
  responseSub?.remove();
}

function openWhatsApp(phone: string, text: string) {
  const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`;

  Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      Alert.alert("WhatsApp no está instalado");
    } else {
      Linking.openURL(url);
    }
  });
}
