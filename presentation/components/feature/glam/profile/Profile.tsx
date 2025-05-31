import { ScrollView, TouchableOpacity, View } from "react-native";
import { cn } from "@/lib/util";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { ChevronRight } from "@/lib/icons/Icons";
import { Separator } from "@/presentation/components/ui/separator";
import { Href, router } from "expo-router";
import { User } from "@/core/interfaces/user.interface";
import { CustomAvatar } from "@/presentation/components/ui/CustomAvatar";
import { MENU_OPTIONS } from "./MenuOptions";

interface Props {
  user?: User;
  handleOptions: (href: Href) => void;
  onLogout: () => void;
  updateImage: (publicUrl: string) => void;
}

const USER_STYLE: { [key: string]: string } = {
  professional: "border-[3px] border-yellow-600",
  admin: "border-[3px] border-blue-600",
};

const USER_STYLE_COLOR: { [key: string]: string } = {
  professional: "text-yellow-600",
  admin: "text-blue-600",
};

export const Profile = ({
  user,
  handleOptions,
  onLogout,
  updateImage,
}: Props) => {
  const isProfessonalOrAdmin = ["professional", "admin"].includes(user!.role);

  return (
    <View className="p-4 flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex items-center">
          <CustomAvatar
            defaultImage={user?.urlPhoto}
            id={user!.userAuthId}
            isUserImage={true}
            callback={updateImage}
            className={
              isProfessonalOrAdmin
                ? USER_STYLE[user!.role]
                : "border-[1px] border-foreground"
            }
          />

          <Text
            className={cn(
              "text-2xl font-baloo-bold",
              isProfessonalOrAdmin ? "" : "my-2"
            )}
          >
            {user?.name}
          </Text>
          {isProfessonalOrAdmin && (
            <Text
              className={`text-lg  font-baloo-bold mb-2 ${
                USER_STYLE_COLOR[user!.role]
              }`}
            >
              {user?.role === "professional" ? "Profesional" : "Administrador"}
            </Text>
          )}
          <Button
            variant={"outline"}
            size={"sm"}
            onPress={() => router.push("/glam/(tabs)/profile/profile-detail")}
          >
            <Text>Editar Perfil</Text>
          </Button>
        </View>
        <View className="flex-1 mt-4">
          {MENU_OPTIONS.map((section, index) => (
            <View key={index} className="my-4">
              <Text className="font-baloo-bold text-2xl">
                {section.section}
              </Text>

              <Card className="my-2">
                <CardContent className="p-6">
                  {section.options
                    .filter((option) => option.roles.includes(user!.role))
                    .map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        className="p-4"
                        onPress={() => handleOptions(option.href as Href)}
                      >
                        <View className="flex flex-row justify-between mb-2 ">
                          <View className="flex flex-row items-center gap-2">
                            {option.icon}
                            <Text>{option.text}</Text>
                          </View>
                          <ChevronRight className="text-foreground" />
                        </View>
                        <Separator />
                      </TouchableOpacity>
                    ))}
                </CardContent>
              </Card>
            </View>
          ))}
          <Button onPress={onLogout}>
            <Text> Cerrar Sesión</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
