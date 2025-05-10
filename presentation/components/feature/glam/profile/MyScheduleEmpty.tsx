import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { View } from "react-native";
import { Bell } from "@/lib/icons/Icons";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

export const MyScheduleEmpty = () => {
  return (
    <View className="p-4">
      <CustomAlert
        title="Info!!!"
        description="No estas asociado en ningún negocio, por favor , contacta al administrador y dile que te invite."
        type="info"
      />
    </View>
  );
};
