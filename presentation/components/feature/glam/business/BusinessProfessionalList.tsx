import { View } from "react-native";
import { BusinessProfessionalCard } from "./BusinessProfessionalCard";
import { router } from "expo-router";

export const BusinessProfessionalList = ({
  professionals,
}: {
  professionals: any;
}) => {
  const onSelectProfessional = (id: string) => {
    console.log("id", id);
    router.push({
      pathname: "/glam/(tabs)/business/detail/professional-detail/[id]",
      params: { id },
    });
  };

  return (
    <View>
      {professionals.map((professional: any) => (
        <BusinessProfessionalCard
          key={professional.id}
          professional={professional}
          callback={() => onSelectProfessional(professional.id)}
        />
      ))}
    </View>
  );
};
