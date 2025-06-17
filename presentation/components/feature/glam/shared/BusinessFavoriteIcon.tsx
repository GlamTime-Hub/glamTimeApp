import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Heart } from "@/lib/icons/Icons";
import { useUserStore } from "@/presentation/store/use-user.store";
import { CustomDialog } from "@/presentation/components/ui/CustomDialog";
import { Text } from "@/presentation/components/ui/text";
import { addBusinessLikeAction } from "@/core/actions/business/add-like.action";
import { User } from "@/core/interfaces/user.interface";
import { useColorScheme } from "@/lib/useColorScheme";
import { useQueryClient } from "@tanstack/react-query";

export const BusinessFavoriteIcon = () => {
  const { user, addUser } = useUserStore();
  const { id } = useLocalSearchParams();

  const { colorIcons } = useColorScheme();

  const queryClient = useQueryClient();

  const isFavorite = user?.likedBusinessIds?.includes(id as string) || false;

  const [favorite, setFavorite] = useState(isFavorite);

  const onPressLike = async () => {
    await addBusinessLikeAction(id as string, user?.id as string);
    const updateFavorite = !favorite;
    setFavorite(updateFavorite);

    queryClient.invalidateQueries({ queryKey: ["businessFavorites"] });

    const newLikedBusinessIds = updateFavorite
      ? [...user!.likedBusinessIds, id as string]
      : user?.likedBusinessIds!.filter((businessId) => businessId !== id);

    const newUser: User = {
      ...user!,
      likedBusinessIds: newLikedBusinessIds ? newLikedBusinessIds : [],
    };

    addUser(newUser);
  };

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
            Debes iniciar sesión para poder marcar como favorito un negocio.
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
