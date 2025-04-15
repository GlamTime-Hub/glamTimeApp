import { ActiveService } from "@/core/interfaces/active-service.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { useState } from "react";
import { formatCurrency } from "../utils/format-currency.util";
import Toast from "react-native-toast-message";
import { updateServiceAction } from "@/core/actions/services/update-service.action";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  subcategory: SubCategory;
  businessId: string;
  callback: (activeService: ActiveService) => void;
}

export const useBusinessServiceCard = ({
  businessId,
  callback,
  subcategory,
}: Props) => {
  const [service, handleService] = useState({
    checked: subcategory.service.status,
    price: formatCurrency(`${subcategory.service.price}`),
    duration: `${subcategory.service.duration}`,
  });

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const onCheckedChange = async () => {
    if (service.price === "0" || service.duration === "0") {
      Toast.show({
        type: "info",
        text1: "Info",
        text2:
          "Por favor, completa todos los campos antes de activar el servicio.",
      });
      return;
    }

    const activeService: ActiveService = {
      businessId,
      duration: parseInt(service.duration),
      price: parseInt(service.price.replace(/\D/g, "")),
      subcategoryId: subcategory.id,
      status: !service.checked,
      name: subcategory.name,
      categoryId: subcategory.categoryId,
      serviceId: subcategory.service.id,
    };

    await callback(activeService);

    handleService({
      ...service,
      checked: !service.checked,
    });
  };

  const onChangePrice = (value: string) => {
    const formatted = formatCurrency(value);
    handleService({
      ...service,
      price: formatted,
    });
  };

  const onChangeDuration = (value: string) => {
    handleService({
      ...service,
      duration: value,
    });
  };

  const onSave = async () => {
    setLoading(true);
    const updateService = {
      serviceId: subcategory.service.id,
      duration: parseInt(service.duration),
      price: parseInt(service.price.replace(/\D/g, "")),
    };

    await updateServiceAction(updateService);
    queryClient.invalidateQueries({
      queryKey: ["business-services", businessId],
    });

    Toast.show({
      type: "success",
      text1: "Ok",
      text2: "Servicio actualizado correctamente.",
    });
    setLoading(false);
  };

  return {
    service,
    saveLoading: loading,
    onSave,
    onCheckedChange,
    onChangePrice,
    onChangeDuration,
  };
};
