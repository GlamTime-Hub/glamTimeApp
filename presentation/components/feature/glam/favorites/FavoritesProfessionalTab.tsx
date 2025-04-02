import { View } from "react-native";
import { BusinessProfessionalCard } from "../business/BusinessProfessionalCard";
import { professionals } from "@/BD/professional.constant";
import { router } from "expo-router";

export const FavoritesProfessionalTab = () => {
  const onSelectProfessional = (id: string) => {
    router.push({
      pathname: "/glam/(tabs)/business/detail/professional-detail/[id]",
      params: { id },
    });
  };

  return (
    <View>
      {professionals.map((prof) => (
        <BusinessProfessionalCard
          key={prof.id}
          professional={prof}
          selecteable={false}
          selected={false}
          callback={() => onSelectProfessional(prof.id)}
        />
      ))}
    </View>
  );
};
