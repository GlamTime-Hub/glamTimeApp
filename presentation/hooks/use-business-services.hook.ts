import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Toast from "react-native-toast-message";

import { getServicesByBusinessAction } from "@/core/actions/services/get-services-by-business.action";
import { ActiveService } from "@/core/interfaces/active-service.interface";
import { activeServiceAction } from "@/core/actions/services/active-service.action";
import { useBusinessBookingStore } from "../store/use-business-booking.store";
import { SubCategory } from "@/core/interfaces/service.interface";
import { router } from "expo-router";

const staleTime = 1000 * 60 * 60 * 24;

export const useBusinessServices = (
  businessId: string,
  filterByBusiness: boolean
) => {
  const [loading, setLoading] = useState(false);
  const { addService } = useBusinessBookingStore();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["business-services", `${businessId}-${filterByBusiness}`],
    queryFn: () => getServicesByBusinessAction(businessId, filterByBusiness),
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
    addService(service);
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
