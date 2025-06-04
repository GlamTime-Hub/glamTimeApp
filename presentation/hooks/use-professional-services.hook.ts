import { getServicesByProfessionalAction } from "@/core/actions/services/get-services-by-professional.action";
import { SubCategory } from "@/core/interfaces/service.interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useUserStore } from "../store/use-user.store";
import { newProfessionalServiceAction } from "@/core/actions/professional/add-service.action";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { removeProfessionalServiceAction } from "@/core/actions/professional/remove-service.action";
const staleTime = 1000 * 60 * 60;

export const useProfessionalServices = () => {
  const { businessId } = useLocalSearchParams();
  const { user } = useUserStore();

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["professional-services"],
    queryFn: () =>
      getServicesByProfessionalAction(
        businessId as string,
        "",
        user?.userAuthId as string
      ),
    staleTime,
  });

  const onActiveProfessionalService = async (
    subcategory: SubCategory,
    checked: boolean
  ) => {
    setLoading(true);

    const activeService = {
      business: businessId as string,
      status: checked,
      service: subcategory.service.id,
    };

    if (checked) {
      await newProfessionalServiceAction(activeService);
    } else {
      await removeProfessionalServiceAction(subcategory.service.id);
    }

    queryClient.invalidateQueries({
      queryKey: ["professional-services"],
    });

    Toast.show({
      type: "success",
      text1: "Servicio actualizado",
      text2: checked
        ? "El servicio ha sido activado correctamente."
        : "El servicio ha sido desactivado correctamente.",
    });

    setLoading(false);
  };

  return {
    services: data?.data,
    isLoading,
    onActiveProfessionalService,
  };
};
