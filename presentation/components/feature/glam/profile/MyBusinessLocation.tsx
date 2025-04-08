import { View } from "react-native";
import { GoogleMaps } from "../shared/GoogleMaps";
import { useBusinessLocation } from "@/presentation/hooks/use-business-location";

export const MyBusinessLocation = () => {
  const { region, setRegion, onSaveLocation } = useBusinessLocation();

  return (
    <View className="flex-1 m-4 flex flex-col justify-between">
      <GoogleMaps
        region={region}
        setRegion={setRegion}
        callback={onSaveLocation}
      />
    </View>
  );
};
