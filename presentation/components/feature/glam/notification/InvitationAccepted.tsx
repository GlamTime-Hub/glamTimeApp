import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { useUserNotificationStore } from "@/presentation/store/use-user-notification.store";
import { Redirect } from "expo-router";
import { View } from "react-native";

export const InvitationAccepted = () => {
  const { notification } = useUserNotificationStore();

  if (!notification) {
    return <Redirect href="/glam/(tabs)/notifications/home" />;
  }

  return (
    <View className="flex-1 p-4">
      <CustomAlert
        title="Invitación aceptada"
        description={`El profesional ${notification.fromUser.name} ha aceptado tu invitación para ser parte del equipo de trabajo, a partir de ahora, el profesional estará en la lista de tu negocio y podrá recibir reservas.`}
        type="info"
      />
    </View>
  );
};
