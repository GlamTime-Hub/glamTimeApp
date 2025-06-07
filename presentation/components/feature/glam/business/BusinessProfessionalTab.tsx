import { useBusinessProfessional } from "@/presentation/hooks/use-business-professionals.hook";
import { View } from "react-native";
import { BusinessProfessionalTabLoading } from "./BusinessProfessionalTabLoading";
import { BusinessProfessionalCard } from "./BusinessProfessionalCard";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

export const BusinessProfessionalTab = ({ id }: { id: string }) => {
  const { professionals, isLoading, goPrefessionalDetail } =
    useBusinessProfessional(id);

  if (isLoading) {
    return <BusinessProfessionalTabLoading />;
  }

  if (professionals?.length === 0) {
    return (
      <CustomAlert
        title="Info!!!"
        description="El negocio no tiene profesionales activos."
        type="info"
      />
    );
  }

  return (
    <View>
      {professionals?.map((professional) => (
        <BusinessProfessionalCard
          key={professional.id}
          professional={professional}
          callback={goPrefessionalDetail}
        />
      ))}
    </View>
  );
};
