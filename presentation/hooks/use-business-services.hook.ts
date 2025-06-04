import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Toast from "react-native-toast-message";

import { getServicesByBusinessAction } from "@/core/actions/services/get-services-by-business.action";
import { ActiveService } from "@/core/interfaces/active-service.interface";
import { activeServiceAction } from "@/core/actions/services/active-service.action";
import { useBusinessBookingStore } from "../store/use-business-booking.store";
import { SubCategory } from "@/core/interfaces/service.interface";
import { router } from "expo-router";
import useAuthStore from "@/core/store/auth.store";

const staleTime = 1000 * 60 * 60;

export const useBusinessServices = (
  businessId: string,
  filterByBusiness: boolean,
  fromProfessional: boolean = false,
  businessType: string
) => {
  const { session } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { professional, addService } = useBusinessBookingStore();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["business-services", `${businessId}-${filterByBusiness}`],
    queryFn: () =>
      getServicesByBusinessAction(businessId, filterByBusiness, businessType),
    staleTime,
  });

  const onActiveService = async (activeService: ActiveService) => {
    setLoading(true);

    await activeServiceAction(activeService);

    Toast.show({
      type: "success",
      text1: `Listo`,
      text2: `El servicio ${activeService.name} ha sido ${
        activeService.status ? "activado" : "desactivado"
      }`,
    });

    queryClient.invalidateQueries({
      queryKey: ["business-services", `${businessId}-${filterByBusiness}`],
    });

    queryClient.invalidateQueries({
      queryKey: ["businesses"],
    });

    setLoading(loading);
  };

  const onBookingService = (service: SubCategory) => {
    if (!session) {
      router.push("/login/home");
      Toast.show({
        type: "info",
        text1: "Info!!",
        text2: "Para continuar debes iniciar sesión",
      });

      return;
    }

    if (!professional && fromProfessional) {
      Toast.show({
        type: "error",
        text1: "No puedes reservarte a ti mismo.",
        text2: "Selecciona otro profesional.",
      });
      return;
    }

    addService(service);

    if (professional && fromProfessional) {
      router.push("/glam/(tabs)/business/detail/booking/slots");
      return;
    }

    router.push({
      pathname:
        "/glam/(tabs)/business/detail/booking/professional/[businessId]",
      params: { businessId },
    });
  };

  return {
    services: data?.data,
    isLoading,
    activeServiceIsLoading: loading,
    isError,
    onActiveService,
    onBookingService,
  };
};
