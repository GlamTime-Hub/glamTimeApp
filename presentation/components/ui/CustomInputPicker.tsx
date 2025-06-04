import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { Input } from "./input";
import { Text } from "./text";
import { Picker } from "@react-native-picker/picker";
import { Button } from "./button";
import { useColorScheme } from "@/lib/useColorScheme";

interface Props {
  value: {
    label: string;
    value: string;
  };
  size?: string;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  callback: (value: string) => void;
  items: { label: string; value: string }[];
  placeHolder: string;
  label: string;
}

export const CustomInputPicker = ({
  value,
  openModal,
  label,
  placeHolder,
  items,
  size = "w-full",
  setOpenModal,
  callback,
}: Props) => {
  const { isDarkColorScheme } = useColorScheme();

  const backgroundColor = isDarkColorScheme ? `bg-[#1B1B1F]` : "bg-white";

  return (
    <View className={size}>
      <Input
        onPress={() => setOpenModal(true)}
        readOnly={true}
        value={`${value.label}`}
        placeholder={label}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
          <View className="flex-1 justify-end">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                className={`${backgroundColor} rounded-t-2xl p-4 shadow-lg`}
              >
                <Text className="text-center text-xl font-baloo-bold mb-2">
                  {placeHolder}
                </Text>
                <Picker
                  selectedValue={`${value.value}`}
                  onValueChange={(itemValue) => {
                    callback(itemValue as string);
                  }}
                >
                  {items.map((val) => (
                    <Picker.Item
                      key={val.label}
                      label={`${val.label}`}
                      value={`${val.value}`}
                    />
                  ))}
                </Picker>

                <View className="flex gap-2  my-4">
                  <Button onPress={() => setOpenModal(false)}>
                    <Text className="text-white">Cerrar</Text>
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
