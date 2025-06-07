import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

import { useBusinessBookingStore } from "../store/use-business-booking.store";
import useAuthStore from "@/core/store/auth.store";
import { getServicesByProfessionalAction } from "../../core/actions/services/get-services-by-professional.action";
import { SubCategoryWithService } from "@/core/interfaces/professional-service.interface";

const staleTime = 1000 * 60 * 60;

export const useBusinessProfessionalServices = (
  professionalId: string,
  businessId: string
) => {
  const { session } = useAuthStore();
  const { professional, addService } = useBusinessBookingStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["business-professional-services", `${professional?.id}`],
    queryFn: () =>
      getServicesByProfessionalAction(businessId, professionalId, ""),
    staleTime,
  });

  const onBookingService = (service: SubCategoryWithService) => {
    if (!session) {
      router.push("/login/home");
      Toast.show({
        type: "info",
        text1: "Info!!",
        text2: "Para continuar debes iniciar sesión",
      });

      return;
    }

    if (!professional) {
      Toast.show({
        type: "error",
        text1: "No puedes reservarte a ti mismo.",
        text2: "Selecciona otro profesional.",
      });
      return;
    }

    addService(service);

    if (professional) {
      router.push("/glam/(tabs)/business/detail/booking/slots");
      return;
    }
  };

  const services = data?.data
    .map((service) => {
      const subcategories = service.subCategories.filter(
        (subCategorie) => subCategorie.service.isAssignedToProfessional
      );
      return {
        ...service,
        subCategories: subcategories,
      };
    })
    .filter((service) => service.subCategories.length > 0);

  return {
    services,
    isLoading,
    isError,
    onBookingService,
  };
};
