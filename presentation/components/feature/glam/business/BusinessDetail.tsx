import {
  MapPinned,
  MessageCircleMore,
  Star,
  Heart,
  NotebookPen,
} from "@/lib/icons/Icons";
import Share from "@/lib/icons/Share";
import { WhatsAppIcon } from "@/lib/icons/WhatsApp";
import { cn } from "@/lib/util";
import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";
import { router } from "expo-router";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BusinessTab } from "./BussinessTab";
import { useBusinessDetail } from "@/presentation/hooks";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { BusinessDetailLoading } from "./BusinessDetailLoading";
import { Separator } from "@/presentation/components/ui/separator";
import { useColorScheme } from "@/lib/useColorScheme";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 100,
  },
});

export const BusinessDetail = () => {
  const { id, business, isLoading, openWhatsApp, openLocation } =
    useBusinessDetail();

  const { titleColor, colorIcons, backgroundColors } = useColorScheme();

  if (isLoading) {
    return <BusinessDetailLoading />;
  }

  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full h-[200px]">
          <ImageBackground
            resizeMode="cover"
            className="relative"
            source={{
              uri: business?.urlPhoto,
              scale: 0.2,
            }}
            style={styles.image}
          >
            <View className="absolute flex  gap-4 right-6 bottom-4">
              <TouchableOpacity
                onPress={() =>
                  openWhatsApp(
                    business?.phoneNumber!,
                    business?.phoneNumberExtension!
                  )
                }
                className="flex justify-between flex-row items-center gap-1"
              >
                <Text
                  className={cn(
                    "py-1 px-2 text-sm rounded-lg bg-primary text-white"
                  )}
                >
                  Mensaje
                </Text>

                <WhatsAppIcon size={30} />
              </TouchableOpacity>
              <TouchableOpacity className="flex justify-between flex-row items-center gap-1">
                <Text
                  className={cn(
                    "py-1 px-2 text-sm rounded-lg bg-primary text-white"
                  )}
                >
                  Compartir
                </Text>
                <Share size={30} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View className="flex-1 mb-5">
          <View className="p-5">
            <Card>
              <CardContent>
                <Text
                  className={`text-2xl text-center my-3 font-baloo-bold ${titleColor}`}
                >
                  {business?.name}
                </Text>
                <Separator className="mb-4" />
                <View className="flex flex-col items-center px-2">
                  <View>
                    <Text className="text-muted-foreground" numberOfLines={3}>
                      {business?.location.address}
                    </Text>
                  </View>
                  <View className="flex flex-row gap-10 justify-between">
                    <TouchableOpacity
                      onPress={() =>
                        openLocation(
                          business?.location.latitude!,
                          business?.location.longitude!,
                          business?.location.address!
                        )
                      }
                      className="flex my-4 flex-row items-center gap-1"
                    >
                      <Text
                        className={`py-1 px-2 text-md rounded-lg text-white ${backgroundColors}`}
                      >
                        Ver ubicación
                      </Text>
                      <MapPinned size={30} className={colorIcons} />
                    </TouchableOpacity>
                    <View className="flex flex-row items-center  gap-1">
                      <Text className="mt-2 text-3xl">{business?.rating}</Text>
                      <Star color="#FFD700" size={30} fill={"gold"} />
                    </View>
                  </View>
                </View>
                <View className="flex  flex-row  gap-4 justify-center mt-4 rounded-lg">
                  <Card>
                    <CardContent className="py-2 px-4">
                      <View className="flex flex-row justify-center items-center gap-1 ">
                        <Text className={`text-3xl pt-4 ${titleColor}`}>
                          {business?.likes}
                        </Text>
                        <Heart size={26} className={colorIcons} />
                      </View>
                      <Text
                        className={`text-md text-primary font-baloo-bold ${titleColor} `}
                      >
                        Me Gusta
                      </Text>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="py-2  px-4">
                      <View className="flex  flex-row gap-1 justify-center items-center">
                        <Text className={`text-3xl pt-4 ${titleColor}`}>
                          {business?.totalBooking}
                        </Text>
                        <NotebookPen size={28} className={colorIcons} />
                      </View>
                      <Text
                        className={`text-md text-primary font-baloo-bold ${titleColor}`}
                      >
                        Reservas
                      </Text>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="py-2  px-4">
                      <View className="flex  flex-row gap-1 justify-center items-center">
                        <Text className={`text-3xl pt-4 ${titleColor}`}>
                          {business?.receivedReviews}
                        </Text>
                        <MessageCircleMore size={30} className={colorIcons} />
                      </View>
                      <Text
                        className={`text-md text-primary font-baloo-bold ${titleColor}`}
                      >
                        Comentarios
                      </Text>
                    </CardContent>
                  </Card>
                </View>
              </CardContent>
            </Card>
          </View>

          <View className="px-5 py-3">
            <Button
              onPress={() =>
                router.push({
                  pathname: "/glam/(tabs)/business/detail/comments/[id]",
                  params: { id: business?.id! },
                })
              }
            >
              <Text>Ver Comentarios</Text>
            </Button>
          </View>
          <View className="px-5 py-2">
            <BusinessTab
              id={id as string}
              businessType={business?.businesstype!}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
