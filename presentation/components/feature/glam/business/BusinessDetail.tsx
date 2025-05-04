import {
  MapPinned,
  MessageCircleMore,
  Star,
  ThumbsUp,
  NotebookPen,
} from "@/lib/icons/Icons";
import Share from "@/lib/icons/Share";
import { WhatsAppIcon } from "@/lib/icons/WhatsApp";
import { useColorScheme } from "@/lib/useColorScheme";
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

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 100,
  },
});

export const BusinessDetail = () => {
  const { isDarkColorScheme } = useColorScheme();

  const { id, business, isLoading, openWhatsApp, openLocation } =
    useBusinessDetail();

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
                    " py-1 px-2 text-sm rounded-lg",
                    isDarkColorScheme
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  )}
                >
                  Mensaje
                </Text>

                <WhatsAppIcon size={30} />
              </TouchableOpacity>
              <TouchableOpacity className="flex justify-between flex-row items-center gap-1">
                <Text
                  className={cn(
                    " py-1 px-2 text-sm rounded-lg",
                    isDarkColorScheme
                      ? "bg-white text-black"
                      : "bg-black text-white"
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
                <Text className="text-2xl text-center my-3 font-baloo-bold">
                  {business?.name}
                </Text>
                <Separator className="mb-4" />
                <View className="flex flex-col items-center px-2">
                  <View>
                    <Text className="" numberOfLines={3}>
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
                        className={cn(
                          " py-1 px-2 text-md rounded-lg",
                          isDarkColorScheme
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        )}
                      >
                        Ver ubicación
                      </Text>
                      <MapPinned size={30} className="text-foreground" />
                    </TouchableOpacity>
                    <View className="flex flex-row items-center  gap-1">
                      <Text className="font-baloo-bold mt-2 text-2xl">
                        {business?.rating}
                      </Text>
                      <Star color="#FFD700" size={30} fill={"gold"} />
                    </View>
                  </View>
                </View>
                <View className="flex  flex-row  gap-4 justify-center mt-4 rounded-lg">
                  <Card>
                    <CardContent className="py-2 px-4">
                      <View className="flex flex-row justify-center items-center gap-1 ">
                        <Text className="text-3xl pt-4">{business?.likes}</Text>
                        <ThumbsUp size={26} className="text-foreground" />
                      </View>
                      <Text className="text-md font-baloo-bold">Me Gusta</Text>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="py-2  px-4">
                      <View className="flex  flex-row gap-1 justify-center items-center">
                        <Text className="text-3xl pt-4 ">
                          {business?.totalBooking}
                        </Text>
                        <NotebookPen size={28} className="text-foreground" />
                      </View>
                      <Text className="text-md font-baloo-bold">Reservas</Text>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="py-2  px-4">
                      <View className="flex  flex-row gap-1 justify-center items-center">
                        <Text className="text-3xl pt-4 ">
                          {business?.receivedReviews}
                        </Text>
                        <MessageCircleMore
                          size={30}
                          className="text-foreground"
                        />
                      </View>
                      <Text className="text-md font-baloo-bold">
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
            <BusinessTab id={id as string} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
