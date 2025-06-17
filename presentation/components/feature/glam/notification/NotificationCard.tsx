import { StyleSheet, View } from "react-native";

import { UserNotification } from "@/core/interfaces/user-notification.interface";
import { Text } from "@/presentation/components/ui/text";
import { es } from "date-fns/locale";
import {
  ChevronRight,
  CalendarCheck2,
  CalendarCheck,
  CalendarX,
  SquareScissors,
  PartyPopper,
  UserX,
} from "@/lib/icons/Icons";
import { formatDistanceToNow } from "date-fns";
import { useColorScheme } from "@/lib/useColorScheme";

interface Props {
  notification: UserNotification;
}

export const NotificationCard = ({ notification }: Props) => {
  const { titleColor, colorIcons } = useColorScheme();

  const NOTIFICATION_ICON: { [key: string]: React.ReactNode } = {
    "professional-booking": <CalendarCheck2 className={colorIcons} />,
    "booking-confirmed": <CalendarCheck className={colorIcons} />,
    "booking-cancelled-by-user": <CalendarX className={colorIcons} />,
    "booking-cancelled-by-professional": <CalendarX className={colorIcons} />,
    invitation: <SquareScissors className={colorIcons} />,
    "invitation-accepted": <PartyPopper className={colorIcons} />,
    "invitation-rejected": <UserX className={colorIcons} />,
    "invitation-removed": <UserX className={colorIcons} />,
  };

  return (
    <View className=" px-2 border-b-[1px] border-b-muted">
      <View className="flex flex-row items-center justify-center">
        {NOTIFICATION_ICON[notification.type]}
        <View style={styles.rectButton} className=" py-2">
          <Text className={`text-primary mt-4 ${titleColor}`}>
            {notification.title}
          </Text>
          <Text
            numberOfLines={3}
            ellipsizeMode={"tail"}
            className="mb-2 text-md text-muted-foreground"
          >
            {notification.body}
          </Text>
          <Text style={styles.dateText}>
            <ChevronRight className="text-primary" />
          </Text>
        </View>
      </View>
      <Text className="text-xs text-right mb-2 px-2">
        {formatDistanceToNow(new Date(notification.createdAt), {
          locale: es,
          addSuffix: true,
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "column",
  },
  dateText: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    top: 10,
    color: "#999",
    fontWeight: "bold",
  },
});
