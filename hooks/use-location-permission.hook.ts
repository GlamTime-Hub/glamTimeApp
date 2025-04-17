import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Platform, Linking } from "react-native";
import { useLocationStore } from "@/core/store/location.store";

export const useLocationPermission = () => {
  const setLocation = useLocationStore((state) => state.setLocation);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const requestLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permiso de ubicación denegado");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };

    setLocation(coords);
  };

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return {
    errorMsg,
  };
};
