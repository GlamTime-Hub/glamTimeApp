import "react-native-get-random-values";
import MapView, { Marker } from "react-native-maps";
import { useRef } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Region } from "@/core/interfaces/region.interface";
import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";

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
        <GooglePlacesAutocomplete
          placeholder="Buscar dirección"
          fetchDetails={true}
          onPress={(data, details: any) => {
            const { lat, lng } = details.geometry.location;

            const newRegion = {
              address: data.description,
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };

            setRegion(newRegion);
            mapRef.current?.animateToRegion(newRegion, 1000);
          }}
          query={{
            key: "AIzaSyAsW7SWTUZDXYgQpn67ifBBY3c-vghx2XQ",
            language: "es",
            components: "country:co",
          }}
          styles={{
            container: {
              position: "absolute",
              top: 0,
              width: "100%",
              alignSelf: "center",
              zIndex: 9999,
              elevation: 5,
            },
            textInput: {
              height: 40,
              borderColor: "#ccc",
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: "#fff",
              color: "#000",
            },
          }}
        />
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
