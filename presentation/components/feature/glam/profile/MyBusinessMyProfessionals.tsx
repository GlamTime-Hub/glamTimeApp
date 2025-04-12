import { View } from "react-native";

import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Text } from "@/presentation/components/ui/text";
import { MyBusinessDetailProfessionalCard } from "./MyBusinessDetailProfessionalCard";
import { useBusinessMyProfessionals } from "@/presentation/hooks/use-business-my-professionals.hook";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { useLocalSearchParams } from "expo-router";
import { MyBusinessMyProfessionalsLoading } from "./MyBusinessMyProfessionalsLoading";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { AlertTriangle } from "@/lib/icons/Icons";

export const MyBusinessMyProfessionals = () => {
  const { businessId } = useLocalSearchParams();

  const {
    professionals,
    isLoadingProfessionals,
    loading,
    email,
    setEmail,
    onSendInvitation,
    onDeactivateProfessional,
  } = useBusinessMyProfessionals(businessId as string);

  if (isLoadingProfessionals) {
    return <MyBusinessMyProfessionalsLoading />;
  }

  return (
    <View className="p-6">
      <Text className="my-2 text-xl font-bold">
        Gestiona todos tus profesionales
      </Text>
      <View>
        <View className="my-2">
          <Text className="font-bold">Invitar Profesional</Text>
          <Input
            placeholder="Email del profesional"
            inputMode="email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Button
          onPress={onSendInvitation}
          variant={"outline"}
          className="mb-5 flex flex-row gap-2"
        >
          {loading && <LoadingIndicator />}
          <Text>Invitar</Text>
        </Button>
      </View>

      {professionals.length === 0 ? (
        <View>
          <Text className="text"></Text>
          <Alert
            icon={AlertTriangle}
            variant="destructive"
            className="max-w-xl"
          >
            <AlertTitle>Info!</AlertTitle>
            <AlertDescription>
              Actualmente no tienes profesionales en tu negocio
            </AlertDescription>
          </Alert>
        </View>
      ) : (
        <View>
          <View>
            <View className="flex flex-row gap-2">
              <View className="w-8 h-6 border-2 border-yellow-200"></View>
              <Text>Invitación pendiente</Text>
            </View>
          </View>
          <View>
            {professionals.map((professional: any) => (
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
