import "react-native-get-random-values";
import MapView, { Marker } from "react-native-maps";
import { useRef } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Region } from "@/core/interfaces/region.interface";
import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";
import { GoogleInput } from "./GoogleInput";

interface Props {
  region: Region;
  setRegion: (region: Region) => void;

  callback: () => void;
}

export const GoogleMaps = ({ region, setRegion, callback }: Props) => {
  const mapRef = useRef<any>(null);

  return (
    <View className="flex flex-1 flex-col justify-between">
      <View className="">
        <GoogleInput setRegion={setRegion} />
        <View className="">
          <MapView
            ref={mapRef}
            style={styles.mapStyle}
            region={region}
            initialRegion={region}
          >
            <Marker coordinate={region} title="Dirección seleccionada" />
          </MapView>
        </View>
      </View>
      <Button onPress={callback}>
        <Text>Guardar</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    borderRadius: 8,
  },
  mapStyle: {
    width: Dimensions.get("window").width - 30,
    marginRight: 0,
    height: 500,
  },
});
