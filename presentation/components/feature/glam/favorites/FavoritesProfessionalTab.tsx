import { View } from "react-native";
import { BusinessProfessionalCard } from "../business/BusinessProfessionalCard";
import { router } from "expo-router";
import { useProfessionalFavorites } from "@/presentation/hooks/use-professional-favorites.hook";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { ProfessionalFavoriteLoadingCard } from "../business/ProfessionalFavoriteLoadingCard";

export const FavoritesProfessionalTab = () => {
  const { professionals, isLoading } = useProfessionalFavorites();

  const onSelectProfessional = (id: string, businessId: string) => {
    router.push({
      pathname:
        "/glam/(tabs)/business/detail/professional-detail/[professionalId]",
      params: { professionalId: id, businessId },
    });
  };

  if (isLoading) {
    return <ProfessionalFavoriteLoadingCard />;
  }

  if (professionals.length === 0) {
    return (
      <CustomAlert
        title="Info!!!"
        description="No tienes profesionales favoritos."
        type="info"
      />
    );
  }

  return (
    <View>
      {professionals.map((prof) => (
        <BusinessProfessionalCard
          key={prof.id}
          professional={prof as any}
          callback={() => onSelectProfessional(prof.id, prof.businessId)}
        />
      ))}
    </View>
  );
};
