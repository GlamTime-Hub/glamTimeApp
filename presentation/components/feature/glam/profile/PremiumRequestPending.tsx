import { View } from "react-native";

import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { MailCheck } from "@/lib/icons/Icons";

export const PremiumRequestPending = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) {
    return (
      <View className="p-4">
        <Card>
          <CardContent className="flex items-center  p-4">
            <MailCheck className="text-foreground" size={35} />
            <Text numberOfLines={3} className="mt-4">
              Tu solicitud ha sido enviada, por favor espera la aprobación de un
              administrador.
            </Text>
          </CardContent>
        </Card>
      </View>
    );
  }

  return (
    <View>
      <Card>
        <CardContent className="p-4">
          <Text>
            Ya eres premium, puedes administrar tus negocios y profesionales,
            gestionar tus servicios y turnos de tus clientes.
          </Text>
        </CardContent>
      </Card>
    </View>
  );
};
