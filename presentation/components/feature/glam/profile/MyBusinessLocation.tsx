import { View, Dimensions, StyleSheet } from "react-native";
import "react-native-get-random-values";

import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRef, useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";

interface Props {
  location: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  setLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    }>
  >;
}

export const MyBusinessLocation = () => {
  const [region, setRegion] = useState({
    latitude: 4.711,
    longitude: -74.0721,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const mapRef = useRef<any>(null);

  return (
    <View className="flex-1 m-4 flex flex-col justify-between">
      <View className="">
        <GooglePlacesAutocomplete
          placeholder="Buscar dirección"
          fetchDetails={true}
          onPress={(data, details: any) => {
            console.log("Dirección:", data.description);
            console.log("Coordenadas:", details?.geometry.location);
            const { lat, lng } = details.geometry.location;

            const newRegion = {
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
              zIndex: 1,
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
        <View className="my-10">
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
      <Button>
        <Text>Guardar</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mapStyle: {
    width: Dimensions.get("window").width - 30,
    marginRight: 15,
    height: 500,
  },
});
