import { Professional } from "@/core/interfaces/professional.interface";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { TouchableOpacity, View } from "react-native";
import { Trash2 } from "@/lib/icons/Icons";
import { CustomDialog } from "@/presentation/components/ui/CustomDialog";
import { router } from "expo-router";
import { useColorScheme } from "@/lib/useColorScheme";
import { useUserStore } from "@/presentation/store/use-user.store";

interface Props {
  professional: Partial<Professional>;
  deactivate?: () => Promise<void>;
}

const CLASS: Record<string, string> = {
  pending: "border-2 border-yellow-200",
};

export const MyBusinessDetailProfessionalCard = ({
  professional,
  deactivate,
}: Props) => {
  const className = CLASS[professional.invitationStatus as string] ?? "";

  const { titleColor } = useColorScheme();

  const { user } = useUserStore();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname:
            "/glam/(tabs)/profile/my-business/my-professionals/detail/[id]",
          params: { id: professional.id! },
        })
      }
    >
      <Card className={`${className} my-2 `}>
        <CardContent className=" relative p-4  flex-row gap-4  items-center">
          <Avatar alt="">
            <AvatarImage
              source={{
                uri: professional.user?.urlPhoto,
              }}
            ></AvatarImage>
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
          <View className="px-4">
            <Text className={`font-baloo-bold text-lg ${titleColor}`}>
              {professional.user?.name}
            </Text>
            <Text className="text-sm text-muted-foreground">
              {professional.user?.email}
            </Text>
            <Text className="text-sm text-muted-foreground">
              {professional.user?.phoneNumber}
            </Text>
          </View>
          {user?.userAuthId !== professional.userAuthId &&
            professional.invitationStatus !== "pending" && (
              <CustomDialog
                className="absolute top-7 right-0"
                isIcon={true}
                icon={<Trash2 color={"red"} />}
                closeLabel="continuar"
                callback={deactivate}
                title={"Desactivar invitación"}
              >
                <Text numberOfLines={2} className="text-muted-foreground">
                  ¿Estás seguro que deseas desactivar la invitación a{" "}
                  {professional.user?.name}?
                </Text>
              </CustomDialog>
            )}
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
