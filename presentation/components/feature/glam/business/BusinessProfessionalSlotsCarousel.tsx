import { AvailableDay } from "@/core/interfaces/available-day.interface";
import { cn } from "@/lib/util";
import { Text } from "@/presentation/components/ui/text";
import { useRef } from "react";
import { useWindowDimensions, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

interface Props {
  data: AvailableDay[];
  onChangeDay?: (availableDay: AvailableDay) => void;
}

export const BusinessProfessionalSlotsCarousel = ({
  data,
  onChangeDay,
}: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const width = useWindowDimensions().width;

  return (
    <View className=" w-full">
      <Carousel
        ref={ref}
        data={data}
        renderItem={({ item }) => (
          <View
            className={cn(
              "flex-1 w-36 pt-4 mx-2 justify-center items-center bg-primary rounded-lg"
            )}
          >
            <Text className="text-center text-xl py-2 text-white">
              {item.month}
            </Text>
            <Text className="text-center font-baloo-bold py-3 text-6xl text-white">
              {item.day}
            </Text>
          </View>
        )}
        onSnapToItem={(index) => {
          onChangeDay && onChangeDay(data[index]);
        }}
        width={165}
        height={100}
        style={{
          width: width,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        defaultIndex={0}
      />
    </View>
  );
};
