import { Professional } from "@/core/interfaces/professional.interface";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Trash2 } from "@/lib/icons/Icons";
import { CustomDialog } from "@/presentation/components/ui/CustomDialog";

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

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(
          `/glam/(tabs)/business/detail/professional-detail/${professional.id}?businessId=${professional.businessId}`
        )
      }
    >
      <Card className={`${className} my-2 `}>
        <CardContent className="  p-4 flex flex-row gap-4 justify-between  items-center">
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
            <Text className="font-bold text-lg">{professional.user?.name}</Text>
            <Text className="text-sm">{professional.user?.email}</Text>
            <Text className="text-sm">{professional.user?.phoneNumber}</Text>
          </View>
          <CustomDialog
            isIcon={true}
            icon={<Trash2 color={"red"} />}
            closeLabel="continuar"
            callback={deactivate}
            title={"Desactivar invitación"}
          >
            <Text numberOfLines={2}>
              ¿Estás seguro que deseas desactivar la invitación a{" "}
              {professional.user?.name}?
            </Text>
          </CustomDialog>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
