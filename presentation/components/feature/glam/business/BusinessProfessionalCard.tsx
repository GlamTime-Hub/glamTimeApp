import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Text } from "@/presentation/components/ui/text";
import { TouchableOpacity, View } from "react-native";
import { MessageCircleMore, Star } from "@/lib/icons/Icons";
import { Button } from "@/presentation/components/ui/button";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/util";

interface Props {
  professional: any;
  callback: (name?: string) => void;
  selecteable?: boolean;
  selected?: boolean;
}

export const BusinessProfessionalCard = ({
  professional,
  callback,
  selecteable = false,
  selected,
}: Props) => {
  const { isDarkColorScheme } = useColorScheme();

  const onSelectProfessional = () => {
    selecteable ? callback(professional) : callback();
  };

  return (
    <TouchableOpacity
      className={cn(selecteable && selected ? "bg-gray-200" : "", "px-6")}
      onPress={onSelectProfessional}
    >
      <View className="py-4 flex flex-row justify-between items-center ">
        <View className="flex flex-row gap-2 items-center">
          <Avatar alt="Imagen de profesional">
            <AvatarImage
              source={{
                uri: professional.urlPhoto,
              }}
            ></AvatarImage>
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <Text
              className={cn(
                isDarkColorScheme && !selected ? "text-white" : "text-black",
                "text-lg font-bold"
              )}
            >
              {professional.name}
            </Text>
            <View className="flex flex-row items-center">
              <Text
                className={cn(
                  isDarkColorScheme && !selected ? "text-white" : "text-black"
                )}
              >
                {professional.receivedComments}
              </Text>
              <Button variant={"ghost"} size={"icon"}>
                <MessageCircleMore
                  size={20}
                  color={isDarkColorScheme && !selected ? "white" : "black"}
                />
              </Button>
            </View>
          </View>
        </View>
        <View className="flex flex-row items-center gap-1">
          <Text
            className={cn(
              isDarkColorScheme && !selected ? "text-white" : "text-black",
              "text-lg font-bold"
            )}
          >
            {professional.rating}
          </Text>
          <Star color="#FFD700" size={25} fill={"gold"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
