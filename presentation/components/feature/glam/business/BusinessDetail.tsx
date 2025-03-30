import { Share2 } from "@/lib/icons/Icons";
import Share from "@/lib/icons/Share";
import { WhatsAppIcon } from "@/lib/icons/WhatsApp";
import { useLocalSearchParams } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 100,
  },
});

export const BusinessDetail = () => {
  const { id } = useLocalSearchParams();

  console.log("id", id);

  return (
    <View className="h-full">
      <View className="w-full h-[300px]">
        <ImageBackground
          className="relative"
          source={{
            uri: "https://images.pexels.com/photos/31323301/pexels-photo-31323301/free-photo-of-diseno-interior-de-peluqueria-moderna-y-elegante.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
          style={styles.image}
        >
          <View className="absolute flex gap-4 right-6 bottom-4">
            <TouchableOpacity>
              <WhatsAppIcon size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Share size={30} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
