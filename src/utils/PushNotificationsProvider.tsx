import React, { useEffect, useRef, useState } from "react";
import {
  DevicePushToken,
  ExpoPushToken,
  Notification,
  NotificationTriggerInput,
  Subscription,
  useLastNotificationResponse,
} from "expo-notifications";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TabScreensNavigationProp } from "../navigation/NavigationTypes";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

type NotificationData = {
  title: string;
  body: string;
  subtitle?: string;
  delay: NotificationTriggerInput;
};

interface Props {
  children: React.ReactNode;
}

export function PushNotificationsProvider(props: Props) {
  const { children } = props;

  const [expoPushToken, setExpoPushToken] = useState<DevicePushToken>();
  const [notification, setNotification] = useState<Notification>();
  const notificationListener = useRef<Subscription>();

  const navigation =
    useNavigation<TabScreensNavigationProp<"AddEditTransaction">>();

  const lastNotificationResponse = useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
    };
  }, []);

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      console.log(lastNotificationResponse.notification.request.content.data);
      navigation.navigate("AddEditTransaction", {
        transaction: {
          categoryid: 1,
          note: "test",
          id: 1,
          value: 1,
          date: "2021-10-10",
        },
      });
    }
  }, [lastNotificationResponse]);

  return children;
}
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getDevicePushTokenAsync();
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export async function scheduleCustomNotification(
  notificationData: NotificationData
) {
  const { delay, body, subtitle, title } = notificationData;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      subtitle: subtitle,
    },
    trigger: delay,
  });
}
