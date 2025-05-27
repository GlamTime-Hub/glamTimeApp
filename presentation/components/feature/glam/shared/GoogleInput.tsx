import React, { useState, useRef, useCallback } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import axios from "axios";
import { debounce } from "lodash-es";
import { Input } from "@/presentation/components/ui/input";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Separator } from "@/presentation/components/ui/separator";
import { Region } from "@/core/interfaces/region.interface";

const GOOGLE_PLACES_API_KEY = "AIzaSyAA-V6ywYjHy6f1ULs927u7mMUVjx1DF0o";

interface Props {
  setRegion: (region: Region) => void;
}

export const GoogleInput = ({ setRegion }: Props) => {
  const [input, setInput] = useState("");
  const [predictions, setPredictions] = useState<any>([]);
  const cancelTokenSource = useRef<any>(null);

  const fetchPredictions = async (text: string) => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel(
        "Solicitud cancelada debido a una nueva entrada."
      );
    }

    cancelTokenSource.current = axios.CancelToken.source();

    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json",
        {
          params: {
            input: text,
            key: GOOGLE_PLACES_API_KEY,
            language: "es",
            components: "country:co",
          },
          cancelToken: cancelTokenSource.current.token,
        }
      );
      setPredictions(response.data.predictions);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Solicitud cancelada:", error.message);
      } else {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  const fetchPlace = async (placeId: string) => {
    try {
      console.log(
        `https://places.googleapis.com/v1/places/${placeId}?key=${GOOGLE_PLACES_API_KEY}&languageCode=es`
      );
      const response = await axios.get(
        `https://places.googleapis.com/v1/places/${placeId}?key=${GOOGLE_PLACES_API_KEY}&languageCode=es`,
        {
          headers: {
            "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
            "X-Goog-FieldMask": "*",
            "Content-Type": "application/json",
          },
        }
      );

      const { formattedAddress, location, rating, googleMapsUri, displayName } =
        response.data;

      return {
        address: `${displayName.text}, ${formattedAddress}`,
        location: {
          lat: location.latitude,
          lng: location.longitude,
        },
        rating,
        googleMapsUri,
        displayName,
      };
    } catch (error) {
      console.error("Error al obtener detalles del lugar:", error);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchPredictions, 500), []);

  const handleChangeText = (text: string) => {
    setInput(text);
    if (text.length > 2) {
      debouncedFetch(text);
    } else {
      setPredictions([]);
    }
  };

  const handleSelect = async (place: any) => {
    setInput(place.description);

    const placeDetail = await fetchPlace(place.place_id);
    setRegion({
      address: placeDetail?.address!,
      latitude: placeDetail?.location.lat,
      longitude: placeDetail?.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    setPredictions([]);
  };

  return (
    <View>
      <Input
        placeholder="Buscar dirección"
        value={input}
        onChangeText={handleChangeText}
      />
      {predictions.length > 0 && (
        <Card>
          <CardContent>
            <FlatList
              data={predictions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <Text className="my-2">{item.description}</Text>
                  <Separator />
                </TouchableOpacity>
              )}
            />
          </CardContent>
        </Card>
      )}
    </View>
  );
};
