import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { Bell } from "@/lib/icons/Icons";
import { View } from "react-native";

export const BusinessReviewEmpty = () => {
  return (
    <View className="p-4">
      <Alert icon={Bell} variant="default" className="max-w-xl ">
        <AlertTitle>Info!</AlertTitle>
        <AlertDescription>
          El negocio no tiene comentarios aún.
        </AlertDescription>
      </Alert>
    </View>
  );
};
