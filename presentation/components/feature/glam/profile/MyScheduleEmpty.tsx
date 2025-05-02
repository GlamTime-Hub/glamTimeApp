import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { View } from "react-native";
import { Bell } from "@/lib/icons/Icons";

export const MyScheduleEmpty = () => {
  return (
    <View className="p-4">
      <Alert icon={Bell} variant="default" className="max-w-xl">
        <AlertTitle>Info!</AlertTitle>
        <AlertDescription>
          No estas asociado en ningún negocio, por favor , contacta al
          administrador y dile que te invite.
        </AlertDescription>
      </Alert>
    </View>
  );
};
