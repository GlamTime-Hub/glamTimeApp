import { Image, TouchableOpacity, View } from "react-native";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { SquarePen, Image as ImageIcon } from "@/lib/icons/Icons";
import { useColorScheme } from "@/lib/useColorScheme";
import { ProfessionalWithBusiness } from "@/core/interfaces/business-professional.interface";
import { router } from "expo-router";

interface Props {
  businessProfessional: ProfessionalWithBusiness;
}

export const MyScheduleBusinessCard = ({ businessProfessional }: Props) => {
  const { isDarkColorScheme } = useColorScheme();

  const onSelectBusiness = () => {
    router.push({
      pathname:
        "/glam/(tabs)/profile/my-schedule/business-schedule/[businessId]",
      params: { businessId: businessProfessional.business.id },
    });
  };

  return (
    <TouchableOpacity onPress={onSelectBusiness}>
      <Card
        className={`my-2 ${
          businessProfessional.isActive
            ? ""
            : `${isDarkColorScheme ? "bg-red-500" : "bg-red-200"}`
        }`}
      >
        <CardContent className="p-0 flex flex-row">
          {businessProfessional.business.urlPhoto ? (
            <View className="flex w-32 justify-center items-center">
              <Image
                source={{
                  uri: businessProfessional.business.urlPhoto,
                }}
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: "flex-end",
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  padding: 10,
                }}
              />
            </View>
          ) : (
            <View className="flex w-32 justify-center ">
              <ImageIcon
                className="text-foreground"
                size={120}
                strokeWidth={0.5}
              />
            </View>
          )}

          <View className="flex flex-row justify-between relative flex-1">
            <View className="py-4 px-2 ">
              <Text className="font-baloo-bold text-lg" numberOfLines={2}>
                {businessProfessional.business.name}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {businessProfessional.business.location?.address}
              </Text>
            </View>
            <View className="absolute top-4 right-2 ">
              <SquarePen size={20} className="text-foreground" />
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
