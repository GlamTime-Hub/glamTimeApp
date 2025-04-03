import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/components/ui/popover";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowDownWideNarrow,
  Heart,
  Star,
  AArrowDown,
} from "@/lib/icons/Icons";
import { Text } from "@/presentation/components/ui/text";

export const BusinessOrder = () => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TouchableOpacity
          className="flex flex-row px-4 items-center gap-2"
          onPress={() => console.log("")}
        >
          <ArrowDownWideNarrow size={25} className="text-foreground" />
          <Text>Ordenar</Text>
        </TouchableOpacity>
      </PopoverTrigger>
      <PopoverContent
        side={"bottom"}
        insets={contentInsets}
        className="w-40 m-0 p-2"
      >
        <View className="flex flex-row items-center my-2 gap-2">
          <Star size={20} color="#FFD700" fill={"gold"} />
          <Text>Calificación</Text>
        </View>
        <View className="flex flex-row items-center my-2 gap-2">
          <Heart size={20} color="red" fill={"red"} />
          <Text>Likes</Text>
        </View>

        <View className="flex flex-row items-center my-2 gap-2">
          <AArrowDown size={20} className="text-foreground" />
          <Text>Nombre</Text>
        </View>
      </PopoverContent>
    </Popover>
  );
};
