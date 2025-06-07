import { View } from "react-native";

import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";
import { MyBusinessDetailProfessionalCard } from "./MyBusinessDetailProfessionalCard";
import { useBusinessMyProfessionals } from "@/presentation/hooks/use-business-my-professionals.hook";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { useLocalSearchParams } from "expo-router";
import { MyBusinessMyProfessionalsLoading } from "./MyBusinessMyProfessionalsLoading";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { PhoneNumber } from "@/presentation/components/ui/PhoneNumber";
import { useColorScheme } from "@/lib/useColorScheme";

export const MyBusinessMyProfessionals = () => {
  const { businessId } = useLocalSearchParams();

  const { titleColor } = useColorScheme();

  const {
    errors,
    professionals,
    isLoadingProfessionals,
    loading,
    onSendInvitation,
    onChangePhone,
    onChangeCountry,
    handleSubmit,
    onDeactivateProfessional,
  } = useBusinessMyProfessionals(businessId as string);

  if (isLoadingProfessionals) {
    return <MyBusinessMyProfessionalsLoading />;
  }

  return (
    <View className="p-6">
      <Text
        className={`my-2 text-xl font-baloo-bold text-center ${titleColor}`}
      >
        Gestiona todos tus profesionales
      </Text>
      <View>
        <Text className="text-muted-foreground">
          Puedes invitar a tus profesional con el número de teléfono.
        </Text>
        <View className="my-2">
          <PhoneNumber
            onChangeCountry={onChangeCountry}
            onChangePhone={onChangePhone}
            disabled={loading}
          />
          {errors.phoneNumber && (
            <Text className="text-red-500 text-sm">
              {errors.phoneNumber.message}
            </Text>
          )}
        </View>

        <Button
          onPress={handleSubmit(onSendInvitation)}
          className="mb-5 flex flex-row gap-2"
        >
          {loading && <LoadingIndicator />}
          <Text>Invitar</Text>
        </Button>
      </View>

      {professionals?.length === 0 ? (
        <View>
          <Text className="text"></Text>
          <CustomAlert
            title="Info!!!"
            description="Actualmente no tienes profesionales en tu negocio."
            type="destructive"
          />
        </View>
      ) : (
        <View>
          <View>
            <View className="flex flex-row gap-2">
              <View className="w-8 h-6 border-2 border-yellow-200"></View>
              <Text className="text-muted-foreground">
                Invitación pendiente
              </Text>
            </View>
          </View>
          <View>
            {professionals?.map((professional: any) => (
              <MyBusinessDetailProfessionalCard
                key={professional.id}
                professional={professional}
                deactivate={() => onDeactivateProfessional(professional.id)}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
