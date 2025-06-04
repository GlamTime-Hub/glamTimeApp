import { SubCategoryWithService } from "@/core/interfaces/professional-service.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Input } from "@/presentation/components/ui/input";
import { Switch } from "@/presentation/components/ui/switch";
import { Text } from "@/presentation/components/ui/text";
import { useState } from "react";
import { View } from "react-native";

interface Props {
  subcategory: SubCategoryWithService;
  loading: boolean;
  callback: (checked: boolean) => void;
}

export const MyProfessionalServiceCard = ({
  subcategory,
  loading,
  callback,
}: Props) => {
  const [checked, setChecked] = useState(
    subcategory.service.isAssignedToProfessional
  );

  const onCheckedChange = (checked: boolean) => {
    callback && callback(checked);
    setChecked(checked);
  };

  return (
    <View className="my-2">
      <View className="flex flex-row justify-between items-center">
        <Text className="my-2 font-baloo-bold text-xl">{subcategory.name}</Text>
        <View className="flex flex-row gap-2 items-center">
          <Switch checked={checked} onCheckedChange={onCheckedChange} />
        </View>
      </View>
      <View className="flex flex-row justify-between items-center">
        <View className="w-full">
          <Text className="font-baloo-bold">Precio</Text>
          <Input
            readOnly={true}
            placeholder="Precio"
            inputMode="numeric"
            value={`$${subcategory.service.price}`}
          />
          <View>
            <Text className="font-baloo-bold">Duración (Min)</Text>
            <Input
              readOnly={true}
              placeholder="Duración"
              inputMode="numeric"
              value={`${subcategory.service.duration}`}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
