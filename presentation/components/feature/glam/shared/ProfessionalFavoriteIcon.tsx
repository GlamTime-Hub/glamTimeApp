import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { Heart } from "@/lib/icons/Icons";
import { useUserStore } from "@/presentation/store/use-user.store";
import { CustomDialog } from "@/presentation/components/ui/CustomDialog";
import { Text } from "@/presentation/components/ui/text";
import { User } from "@/core/interfaces/user.interface";
import { useColorScheme } from "@/lib/useColorScheme";
import { addProfessionalLikeAction } from "@/core/actions/professional/add-like.action";
import { useBusinessBookingStore } from "@/presentation/store/use-business-booking.store";

export const ProfessionalFavoriteIcon = () => {
  const { user, addUser } = useUserStore();

  const { professional } = useBusinessBookingStore();

  const { colorIcons } = useColorScheme();

  const [favorite, setFavorite] = useState(false);

  const onPressLike = async () => {
    await addProfessionalLikeAction(
      professional?.id as string,
      user?.id as string
    );
    const updateFavorite = !favorite;
    setFavorite(updateFavorite);

    const newLikedProfessionalIds = updateFavorite
      ? [...user!.likedProfessionalIds, professional?.id as string]
      : user?.likedProfessionalIds!.filter((p) => p !== professional?.id);

    const newUser: User = {
      ...user!,
      likedProfessionalIds: newLikedProfessionalIds
        ? newLikedProfessionalIds
        : [],
    };

    addUser(newUser);
  };

  useEffect(() => {
    if (professional) {
      const isFavorite =
        user?.likedProfessionalIds?.includes(professional?.id as string) ||
        false;

      setFavorite(isFavorite);
    }
  }, [professional]);

  if (!user) {
    return (
      <View className="relative h-12 w-10 items-center justify-center">
        <CustomDialog
          isIcon={true}
          icon={<Heart className={colorIcons} strokeWidth={2} />}
          closeLabel="Iniciar sesión"
          callback={() => router.navigate("/login/home")}
          title={"Marcar como favorito"}
        >
          <Text numberOfLines={2} className="text-muted-foreground">
            Debes iniciar sesión para poder marcar como favorito este
            professional.
          </Text>
        </CustomDialog>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPressLike}
      className="relative h-12 w-10 items-center justify-center "
    >
      <View>
        {favorite ? (
          <Heart fill={"red"} color="#FF0000" />
        ) : (
          <Heart className={colorIcons} strokeWidth={2} />
        )}
      </View>
    </TouchableOpacity>
  );
};
