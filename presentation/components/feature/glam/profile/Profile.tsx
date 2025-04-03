import { TouchableOpacity, View } from "react-native";
import { cn } from "@/lib/util";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import {
  MessageCircleMore,
  ChevronRight,
  MessageCircleHeart,
  Building2,
  Bell,
  TicketCheck,
  FileText,
  BadgeHelp,
  Award,
} from "@/lib/icons/Icons";
import { Separator } from "@/presentation/components/ui/separator";
import { Href, router } from "expo-router";

const OPTIONS = [
  {
    icon: <Building2 className="text-foreground" />,
    text: "Mis Negocios",
    href: "/glam/(tabs)/profile/my-business",
    roles: ["admin"],
  },
  {
    icon: <MessageCircleMore className="text-foreground" />,
    text: "Mis Reseñas",
    href: "/glam/(tabs)/profile/my-reviews",
    roles: ["professional", "user", "admin"],
  },
  {
    icon: <MessageCircleHeart className="text-foreground" />,
    text: "Reseñas Recibidas",
    href: "/glam/(tabs)/profile/reviews-received",
    roles: ["professional", "admin"],
  },
  {
    icon: <Bell className="text-foreground" />,
    text: "Notificaciones",
    href: "/glam/(tabs)/profile/notifications",
    roles: ["professional", "user", "admin"],
  },
  {
    icon: <TicketCheck className="text-foreground" />,
    text: "Quiero ser premium",
    href: "/glam/(tabs)/profile/premium",
    roles: ["user"],
  },
  {
    icon: <Award className="text-foreground" />,
    text: "Mi Plan",
    href: "/glam/(tabs)/profile/my-plan",
    roles: ["admin"],
  },
  {
    icon: <BadgeHelp className="text-foreground" />,
    text: "Ayuda y Soporte",
    href: "/glam/(tabs)/profile/help-support",
    roles: ["professional", "admin", "user"],
  },
  {
    icon: <FileText className="text-foreground" />,
    text: "Privacidad y términos de uso",
    href: "/glam/(tabs)/profile/legal-privacity",
    roles: ["professional", "admin", "user"],
  },
];

export const Profile = ({ role = "admin" }: { role: string }) => {
  const isProfessional = role === "professional";

  const handleOptions = (href: Href) => {
    router.push(href);
  };

  return (
    <View className="p-4">
      <View className="flex items-center">
        <Avatar
          alt="Imagen de profesional"
          className={cn(
            role === "pofessional" ? "border-4 border-yellow-600" : ""
          )}
          size="2xl"
        >
          <AvatarImage
            source={{
              uri: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
          ></AvatarImage>
          <AvatarFallback>
            <Text>ZN</Text>
          </AvatarFallback>
        </Avatar>
        {isProfessional && (
          <Text className=" text-sm text-yellow-600 p-2 rounded-full   font-bold">
            Profesional
          </Text>
        )}
        <Text
          className={cn("text-2xl font-bod", isProfessional ? "mb-2" : "my-2")}
        >
          Pedro Sanchez
        </Text>
        <Button variant={"outline"} size={"sm"}>
          <Text>Editar Perfil</Text>
        </Button>
      </View>

      <Card className="my-2">
        <CardContent className="p-6">
          {OPTIONS.filter((option) => option.roles.includes(role)).map(
            (option, index) => (
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
            )
          )}
        </CardContent>
      </Card>
    </View>
  );
};
