import { useBusinessProfessional } from "@/presentation/hooks/use-business-professionals.hook";
import { View } from "react-native";
import { BusinessProfessionalTabLoading } from "./BusinessProfessionalTabLoading";
import { BusinessProfessionalCard } from "./BusinessProfessionalCard";

export const BusinessProfessionalTab = ({ id }: { id: string }) => {
  const { professionals, isLoading, goPrefessionalDetail } =
    useBusinessProfessional(id);

  if (isLoading) {
    return <BusinessProfessionalTabLoading />;
  }

  return (
    <View>
      {professionals?.map((professional) => (
        <BusinessProfessionalCard
          key={professional.id}
          professional={professional}
          selecteable={false}
          callback={goPrefessionalDetail}
        />
      ))}
    </View>
  );
};
