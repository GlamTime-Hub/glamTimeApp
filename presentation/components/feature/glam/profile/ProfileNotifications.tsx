import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import { Switch } from "@/presentation/components/ui/switch";
import { Text } from "@/presentation/components/ui/text";
import { useNotifications } from "@/presentation/hooks";
import { useState } from "react";
import { View } from "react-native";
import { LoadingIndicator } from "../shared/LoadingIndicator";

export const ProfileNotifications = () => {
  const { user, loading, onSaveNotifications } = useNotifications();

  const [notifications, setNotiications] = useState({
    push: user?.notificationPreference.push ?? false,
    news: user?.notificationPreference.news ?? false,
  });

  return (
    <View className="flex-1 flex justify-between p-6">
      <View>
        <Text className="text-xl mb-4 font-bold">
          Maneja tus notificaciones
        </Text>
        <View>
          <Card>
            <CardContent className="flex p-2  flex-row justify-between  items-center">
              <View className="p-2">
                <Text className="text-md font-bold">Notificaciones push </Text>
                <Text className="text-md">
                  Recibe notificaciones de app incluso
                </Text>
                <Text>cuando no las estás utilizando activamente.</Text>
              </View>
              <Switch
                disabled={loading}
                checked={notifications.push}
                onCheckedChange={() =>
                  setNotiications({
                    ...notifications,
                    push: !notifications.push,
                  })
                }
              />
            </CardContent>
          </Card>
        </View>
        <View className="mt-2">
          <Card>
            <CardContent className="flex p-2  flex-row justify-between  items-center">
              <View className="p-2">
                <Text className="text-md font-bold">
                  Promociones y novedades{" "}
                </Text>
                <Text className="text-md">
                  Recibe notificaciones personalizadas
                </Text>
                <Text>sobre lanzamientos y nuevas funciones que </Text>
                <Text>mejoran tu experiencia en GlamTime</Text>
              </View>
              <Switch
                disabled={loading}
                checked={notifications.news}
                onCheckedChange={() =>
                  setNotiications({
                    ...notifications,
                    news: !notifications.news,
                  })
                }
              />
            </CardContent>
          </Card>
        </View>
      </View>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">
            <Text>Guardar</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Guardar Notificaciones</DialogTitle>
            <DialogDescription>
              <View>
                <Text>
                  Si desactivas las notificaciones, no recibirás alertas sobre
                  novedades y actualizaciones en GlamTime.
                </Text>
                <Text>¿Quieres continuar?</Text>
              </View>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="flex flex-row gap-2"
                onPress={() =>
                  onSaveNotifications(notifications.push, notifications.push)
                }
              >
                {loading && <LoadingIndicator />}
                <Text>Continuar</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
};
