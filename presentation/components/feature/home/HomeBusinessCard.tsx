import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../../ui/text";
import { Star } from "@/lib/icons/Icons";
import { cn } from "@/lib/util";

interface Props {
  business: any;
  small: boolean;
}

export const HomeBusinessCard = ({ business, small }: Props) => {
  return (
    <View>
      <TouchableOpacity className="w-full">
        <Image
          source={{
            uri: "https://images.pexels.com/photos/31323301/pexels-photo-31323301/free-photo-of-diseno-interior-de-peluqueria-moderna-y-elegante.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
          style={{
            width: small ? 100 : 150,
            height: small ? 130 : 250,
            justifyContent: "flex-end",
            borderRadius: 5,
          }}
        />
        <View
          className={cn(
            "flex flex-row justify-between items-center",
            small ? `w-[${100}px]` : ""
          )}
        >
          <View className="flex ">
            <Text className="text-sm" numberOfLines={1} ellipsizeMode="tail">
              {business.name.length > 25
                ? business.name.substring(0, 25) + "..."
                : business.name}
            </Text>
            <View className="flex flex-row items-center gap-1">
              <Text className="text-sm">{business.rating.toFixed(1)}</Text>
              <Star color="#FFD700" size={15} fill={"gold"} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 100,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
});
