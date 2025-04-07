import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SquarePen } from "@/lib/icons/Icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { useImage } from "@/presentation/hooks";

interface Props {
  isUserImage: boolean;
  id: string;
  defaultImage?: string;
  callback: (publicUrl: string) => void;
}

export const CustomAvatar = ({
  id,
  isUserImage,
  defaultImage,
  callback,
}: Props) => {
  const { image, setImage, onUpdateImage } = useImage(
    isUserImage,
    id,
    defaultImage ?? ""
  );

  const onSelectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const publicUrl = await onUpdateImage(result.assets[0].uri);
      callback(publicUrl!);
      console.log("publicUrl", publicUrl);
    }
  };

  return (
    <TouchableOpacity onPress={onSelectImage}>
      <View className="flex items-center my-4 relative">
        <Avatar
          alt="Imagen de profesional"
          size="2xl"
          className="border-[1px] border-foreground"
        >
          <AvatarImage
            source={{
              uri: image,
            }}
          ></AvatarImage>
          <AvatarFallback></AvatarFallback>
        </Avatar>

        <SquarePen className="text-foreground absolute top-0 -right-5" />
      </View>
    </TouchableOpacity>
  );
};
