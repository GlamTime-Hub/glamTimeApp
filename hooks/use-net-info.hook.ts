import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

export const useNetInfo = () => {
  const [showInternetError, setShowInternetError] = useState(false);

  const checkInternet = async () => {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      Toast.show({
        type: "error",
        text1: "No hay conexión a Internet",
        text2: "Por favor, verifica tu conexión.",
      });
      setShowInternetError(true);
    }
  };

  useEffect(() => {
    checkInternet();
  }, []);

  return {
    showInternetError,
  };
};
