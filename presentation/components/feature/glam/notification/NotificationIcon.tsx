import { View } from "react-native";
import { Bell } from "@/lib/icons/Icons";

export const NotificationIcon = () => {
  return (
    <View>
      <Bell className="text-foreground" strokeWidth={1.25} />
    </View>
  );
};
