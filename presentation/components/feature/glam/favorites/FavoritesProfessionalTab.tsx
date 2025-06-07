import { View } from "react-native";
import { BusinessProfessionalCard } from "../business/BusinessProfessionalCard";
import { router } from "expo-router";

export const FavoritesProfessionalTab = () => {
  const onSelectProfessional = (id: string) => {
    router.push({
      pathname:
        "/glam/(tabs)/business/detail/professional-detail/[professionalId]",
      params: { professionalId: id },
    });
  };

  return (
    <View>
      {/* {professionals.map((prof) => (
        <BusinessProfessionalCard
          key={prof.id}
          professional={prof as any}
          callback={() => onSelectProfessional(prof.id)}
        />
      ))} */}
    </View>
  );
};
