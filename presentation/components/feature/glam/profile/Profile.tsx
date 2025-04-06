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
  isProfessional: boolean;
  handleOptions: (href: Href) => void;
  onLogout: () => void;
  updateImage: (publicUrl: string) => void;
}

export const Profile = ({
  user,
  isProfessional,
  handleOptions,
  onLogout,
  updateImage,
}: Props) => {
  return (
    <View className="p-4 flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex items-center">
          <CustomAvatar
            defaultImage={user?.urlPhoto}
            id={user!.userAuthId}
            isUserImage={true}
            callback={updateImage}
          />
          {isProfessional && (
            <Text className=" text-sm text-yellow-600 p-2 rounded-full   font-bold">
              Profesional
            </Text>
          )}
          <Text
            className={cn(
              "text-2xl font-bod",
              isProfessional ? "mb-2" : "my-2"
            )}
          >
            {user?.name}
          </Text>
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
            <View key={index}>
              <Text className="font-bold text-xl">{section.section}</Text>

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
            <Text> Cerrar Session</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
