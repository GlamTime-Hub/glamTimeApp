import { ActiveService } from "@/core/interfaces/active-service.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Input } from "@/presentation/components/ui/input";
import { Separator } from "@/presentation/components/ui/separator";
import { Switch } from "@/presentation/components/ui/switch";
import { Text } from "@/presentation/components/ui/text";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

interface Props {
  subcategory: SubCategory;
  businessId: string;

  loading: boolean;
  callback: (activeService: ActiveService) => void;
}

const formatCurrency = (value: string) => {
  const number = parseInt(value.replace(/\D/g, ""), 10) || 0;
  return number.toLocaleString("es-CO");
};

export const MyBusinessMyServicesCard = ({
  subcategory,
  businessId,
  loading,
  callback,
}: Props) => {
  console.log("subcategory", subcategory);

  const [service, handleService] = useState({
    checked: subcategory.service.status,
    price: `${subcategory.service.price}`,
    duration: `${subcategory.service.duration}`,
  });

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

  return (
    <View className="my-2">
      <Text className="my-2 font-bold">{subcategory.name}</Text>
      <View className="flex flex-row justify-between items-center">
        <View className="w-1/3">
          <Text>Precio</Text>
          <Input
            readOnly={loading}
            placeholder="Precio"
            inputMode="numeric"
            value={`$${service.price}`}
            onChangeText={onChangePrice}
          />
        </View>
        <View className="w-1/3">
          <Text>Duración (Min)</Text>
          <Input
            readOnly={loading}
            placeholder="Duración"
            inputMode="numeric"
            value={`${service.duration}`}
            onChangeText={onChangeDuration}
          />
        </View>

        <Switch
          disabled={loading}
          checked={service.checked}
          onCheckedChange={onCheckedChange}
        />
      </View>
      <Separator className="my-2" />
    </View>
  );
};
