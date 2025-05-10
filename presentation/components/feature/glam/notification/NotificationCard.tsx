import { UserNotification } from "@/core/interfaces/user-notification.interface";
import { Text } from "@/presentation/components/ui/text";
import { ChevronRight, CalendarCheck2, CalendarCheck } from "@/lib/icons/Icons";
import { StyleSheet, View } from "react-native";

interface Props {
  notification: UserNotification;
}

const NOTIFICATION_ICON: { [key: string]: React.ReactNode } = {
  "professional-booking": <CalendarCheck2 className="text-primary" />,
  "booking-confirmed": <CalendarCheck className="text-primary" />,
};

export const NotificationCard = ({ notification }: Props) => {
  return (
    <View className="flex flex-row items-center justify-center px-2 border-b-[1px] border-b-gray-100">
      {NOTIFICATION_ICON[notification.type]}
      <View style={styles.rectButton} className=" py-2">
        <Text className="text-primary text-md">{notification.title}</Text>
        <Text numberOfLines={3} ellipsizeMode={"tail"} className="mb-2 text-md">
          {notification.body}
        </Text>
        <Text style={styles.dateText}>
          <ChevronRight className="text-primary" />
        </Text>
      </View>
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
    right: 10,
    top: 10,
    color: "#999",
    fontWeight: "bold",
  },
});
