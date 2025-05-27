import { Picker } from "@react-native-picker/picker";
import { ActiveService } from "@/core/interfaces/active-service.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Input } from "@/presentation/components/ui/input";
import { Switch } from "@/presentation/components/ui/switch";
import { Text } from "@/presentation/components/ui/text";
import { Modal, Pressable, TouchableWithoutFeedback, View } from "react-native";
import { useBusinessServiceCard } from "@/presentation/hooks";
import { Button } from "@/presentation/components/ui/button";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { useState } from "react";

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
            <Pressable
              onPress={() => setModalVisible(true)}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              <Text className="text-l">{service.duration} minutos</Text>
            </Pressable>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View className="flex-1 justify-end">
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <View className="bg-white rounded-t-2xl p-4 shadow-lg">
                      <Text className="text-center text-xl font-baloo-bold mb-2">
                        Duración del servicio
                      </Text>
                      <Picker
                        selectedValue={service.duration}
                        onValueChange={(itemValue) =>
                          onChangeDuration(itemValue)
                        }
                      >
                        {minutes.map((val) => (
                          <Picker.Item
                            key={val}
                            label={`${val} minutos`}
                            value={val}
                          />
                        ))}
                      </Picker>

                      <View className="flex gap-2  my-4">
                        <Button onPress={() => setModalVisible(false)}>
                          <Text className="text-white">Cerrar</Text>
                        </Button>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
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
