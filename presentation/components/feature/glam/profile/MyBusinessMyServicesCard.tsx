import { ActiveService } from "@/core/interfaces/active-service.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Input } from "@/presentation/components/ui/input";
import { Switch } from "@/presentation/components/ui/switch";
import { Text } from "@/presentation/components/ui/text";
import { View } from "react-native";
import { useBusinessServiceCard } from "@/presentation/hooks";
import { Button } from "@/presentation/components/ui/button";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { useState } from "react";
import { CustomInputPicker } from "@/presentation/components/ui/CustomInputPicker";

interface Props {
  subcategory: SubCategory;
  businessId: string;
  loading: boolean;
  callback: (activeService: ActiveService) => void;
}

export const MyBusinessMyServicesCard = ({
  subcategory,
  businessId,
  loading,
  callback,
}: Props) => {
  const {
    minutes,
    service,
    saveLoading,
    onChangeDuration,
    onChangePrice,
    onCheckedChange,
    onSave,
  } = useBusinessServiceCard({ subcategory, businessId, callback });

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="my-2">
      <View className="flex flex-row justify-between items-center">
        <Text className="my-2 font-baloo-bold text-xl">{subcategory.name}</Text>
        <View className="flex flex-row gap-2 items-center">
          <Switch
            disabled={loading || saveLoading}
            checked={service.checked}
            onCheckedChange={onCheckedChange}
          />
        </View>
      </View>
      <View className="flex flex-row justify-between items-center">
        <View className="w-full">
          <Text className="font-baloo-bold">Precio</Text>
          <Input
            readOnly={loading}
            placeholder="Precio"
            inputMode="numeric"
            value={`$${service.price}`}
            onChangeText={onChangePrice}
          />
          <View>
            <Text className="font-baloo-bold">Duración (Min)</Text>

            <CustomInputPicker
              label="Ciudad"
              placeHolder="Selecciona la ciudad"
              value={{ value: service.duration, label: service.duration }}
              callback={(itemValue) => {
                onChangeDuration(itemValue);
              }}
              openModal={modalVisible}
              setOpenModal={(open) => setModalVisible(open)}
              items={
                minutes?.map((minutes) => ({
                  label: `${minutes}`,
                  value: `${minutes}`,
                })) ?? []
              }
            />
          </View>
        </View>
      </View>
      {subcategory.service.id && (
        <Button size={"sm"} className="mt-2 flex-row gap-2" onPress={onSave}>
          {saveLoading && <LoadingIndicator />}
          <Text>Guardar</Text>
        </Button>
      )}
    </View>
  );
};
