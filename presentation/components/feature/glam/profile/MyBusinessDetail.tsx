import { ScrollView, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { CustomAvatar } from "@/presentation/components/ui/CustomAvatar";
import { Text } from "@/presentation/components/ui/text";
import { useBusinessDetail } from "@/presentation/hooks";
import { MyBusinessDetailLoading } from "./MyBusinessDetailLoading";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Separator } from "@/presentation/components/ui/separator";

import {
  ChevronRight,
  Store,
  ShieldUser,
  SquareScissors,
  MessageCircleHeart,
} from "@/lib/icons/Icons";

export const MyBusinessDetail = ({ id }: { id: string }) => {
  const { business, user, isLoading, updateImage } = useBusinessDetail(id);

  if (isLoading) {
    return <MyBusinessDetailLoading />;
  }

  return (
    <View className="flex-1 flex-col justify-evenly px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="flex items-center">
            <CustomAvatar
              defaultImage={business?.urlPhoto}
              id={business?.id ?? ""}
              isUserImage={false}
              callback={updateImage}
            />
          </View>
          <Text className="font-bold my-4 text-xl text-center">
            {business?.name}
          </Text>
        </View>

        <Card className="my-2">
          <CardContent className="p-6">
            <TouchableOpacity
              className="p-4"
              onPress={() =>
                router.push({
                  pathname:
                    "/glam/(tabs)/profile/my-business/business-profile/[id]",
                  params: { id },
                })
              }
            >
              <View className="flex flex-row justify-between mb-2 ">
                <View className="flex flex-row items-center gap-2">
                  <Store className="text-foreground" />
                  <Text>Perfil del negocio</Text>
                </View>
                <ChevronRight className="text-foreground" />
              </View>
              <Separator />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-4"
              onPress={() =>
                router.push({
                  pathname:
                    "/glam/(tabs)/profile/my-business/my-professionals/[businessId]",
                  params: { businessId: id },
                })
              }
            >
              <View className="flex flex-row justify-between mb-2 ">
                <View className="flex flex-row items-center gap-2">
                  <ShieldUser className="text-foreground" />
                  <Text>Mis Profesionales</Text>
                </View>
                <ChevronRight className="text-foreground" />
              </View>
              <Separator />
            </TouchableOpacity>

            <TouchableOpacity
              className="p-4"
              onPress={() =>
                router.push({
                  pathname: "/glam/(tabs)/profile/my-business/my-reviews/[id]",
                  params: { id },
                })
              }
            >
              <View className="flex flex-row justify-between mb-2 ">
                <View className="flex flex-row items-center gap-2">
                  <MessageCircleHeart className="text-foreground" />
                  <Text>Reseñas Recibidas</Text>
                </View>
                <ChevronRight className="text-foreground" />
              </View>
              <Separator />
            </TouchableOpacity>

            <TouchableOpacity
              className="p-4"
              onPress={() =>
                router.push({
                  pathname:
                    "/glam/(tabs)/profile/my-business/my-services/[businessId]",
                  params: { businessId: id },
                })
              }
            >
              <View className="flex flex-row justify-between mb-2 ">
                <View className="flex flex-row items-center gap-2">
                  <SquareScissors className="text-foreground" />
                  <Text>Mis Servicios</Text>
                </View>
                <ChevronRight className="text-foreground" />
              </View>
              <Separator />
            </TouchableOpacity>
          </CardContent>
        </Card>
      </ScrollView>
    </View>
  );
};
