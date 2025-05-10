import { markNotificationAsRead } from "@/core/actions/notification/mark-notification-as-read.action";
import { UserNotification } from "@/core/interfaces/user-notification.interface";
import { useColorScheme } from "@/lib/useColorScheme";
import { Text } from "@/presentation/components/ui/text";
import { useUserNotificationStore } from "@/presentation/store/use-user-notification.store";
import { useQueryClient } from "@tanstack/react-query";
import { Href, router } from "expo-router";
import { useRef, useState } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { LoadingIndicator } from "../shared/LoadingIndicator";

interface Props {
  children: React.ReactNode;
  notification: UserNotification;
}

const NOTIFICATION_ROUTES: { [key: string]: Href } = {
  "professional-booking": "/glam/(tabs)/notifications/professional-booking",
  "booking-confirmed": "/glam/(tabs)/notifications/booking-confirmed",
};

const renderRightAction = (
  text: string,
  color: string,
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  callback: () => void,
  enabled: boolean
) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 200 }],
    };
  });

  const pressHandler = () => {
    callback();
  };

  return (
    <Reanimated.View style={styleAnimation}>
      <RectButton
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={pressHandler}
        enabled={enabled}
      >
        {!enabled ? (
          <LoadingIndicator />
        ) : (
          <Text style={styles.actionText}>{text}</Text>
        )}
      </RectButton>
    </Reanimated.View>
  );
};

const renderRightActions = (
  progress: SharedValue<number>,
  translation: SharedValue<number>,
  notification: UserNotification
) => {
  const { isDarkColorScheme } = useColorScheme();
  const { setNotification } = useUserNotificationStore();
  const queryClient = useQueryClient();
  const [enabled, setEnabled] = useState(true);

  const goToNotificationDetail = () => {
    const route = NOTIFICATION_ROUTES[notification.type];

    if (route) {
      setNotification(notification);
      router.push(route);
    }
  };

  const onDeleteNotification = async () => {
    setEnabled(false);
    await markNotificationAsRead(notification.id);
    setNotification(null);
    Toast.show({
      type: "success",
      text1: "Notificación leída",
      text2: "La notificación ha sido marcada como leída.",
    });

    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({ queryKey: ["totalNotifications"] });
    setEnabled(true);
  };

  return (
    <View
      className="flex flex-row justify-end"
      style={{
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {renderRightAction(
        "Ver",
        isDarkColorScheme ? "#9f8ac2" : "#524785",
        progress,
        translation,
        goToNotificationDetail,
        true
      )}
      {renderRightAction(
        "Eliminar",
        "#dd2c00",
        progress,
        translation,
        onDeleteNotification,
        enabled
      )}
    </View>
  );
};

export const Notification = ({ children, notification }: Props) => {
  const swipeableRowRef = useRef(null);

  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      rightThreshold={40}
      dragOffsetFromRightEdge={1}
      overshootLeft={false}
      overshootFriction={8}
      renderRightActions={(progress, translation) =>
        renderRightActions(progress, translation, notification)
      }
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: 100,
    height: 80,
  },
});
