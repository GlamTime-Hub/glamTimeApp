import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect } from "react";

export const useDeepLinking = () => {
  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      if (url.includes("confirm-email")) {
        router.navigate("/confirm-email");
      }
    };

    const sub = Linking.addEventListener("url", handleDeepLink);

    Linking.getInitialURL().then((url) => {
      console.log("url");
      if (url?.includes("confirm-email")) {
        router.navigate("/confirm-email");
      }
    });

    return () => sub.remove();
  }, []);
};
