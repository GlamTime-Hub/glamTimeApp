import { View } from "react-native";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

export const BusinessReviewEmpty = () => {
  return (
    <View className="p-4">
      <CustomAlert
        title="Info!!!"
        description="El negocio no tiene comentarios aún."
        type="info"
      />
    </View>
  );
};
