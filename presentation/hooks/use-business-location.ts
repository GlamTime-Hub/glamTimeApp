import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { useBusinessLocationStore } from "../store/use-busines-location.store";
import { updateLocationAction } from "@/core/actions/business/update-location.action";

export const useBusinessLocation = () => {
  const { businessId, region, setRegion, setBusinessId } =
    useBusinessLocationStore();

  const queryClient = useQueryClient();

  const onSaveLocation = async () => {
    await updateLocationAction(businessId, region);

    Toast.show({
      type: "success",
      text1: "Ubicación guardada",
      text2: "La ubicación de tu negocio ha sido guardada correctamente",
    });

    if (businessId) {
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    }
  };

  return {
    region,
    setRegion,
    onSaveLocation,
    setBusinessId,
  };
};
