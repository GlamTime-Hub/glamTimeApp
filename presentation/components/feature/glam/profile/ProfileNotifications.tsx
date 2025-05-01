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
import { View } from "react-native";
import { LoadingIndicator } from "../shared/LoadingIndicator";

export const ProfileNotifications = () => {
  const { user, loading, notifications, setNotiications, onSaveNotifications } =
    useNotifications();

  return (
    <View className="flex-1 flex justify-between p-6">
      <View>
        <Text className="text-xl font-baloo-bold mb-4 font-bold">
          Maneja tus notificaciones
        </Text>
        <View>
          <Card>
            <CardContent className="flex p-2">
              <View className=" ">
                <View className="relative flex flex-row justify-between">
                  <Text className="text-md font-baloo-bold">
                    Notificaciones push
                  </Text>
                  <View className="">
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
                  </View>
                </View>
                <Text className="text-md my-2" numberOfLines={2}>
                  Recibe notificaciones de app incluso cuando no las estás
                  utilizando activamente.
                </Text>
              </View>
            </CardContent>
          </Card>
        </View>
        <View className="mt-2">
          <Card>
            <CardContent className="flex p-2  ">
              <View>
                <View className="flex flex-row justify-between">
                  <Text className="text-md font-baloo-bold">
                    Promociones y novedades
                  </Text>
                  <View>
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
                  </View>
                </View>
                <Text className="text-md my-2" numberOfLines={3}>
                  Recibe notificaciones personalizadas sobre lanzamientos y
                  nuevas funciones que mejoran tu experiencia en GlamTime.
                </Text>
              </View>
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
                  onSaveNotifications(notifications.push, notifications.news)
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
