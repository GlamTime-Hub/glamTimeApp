import { ActiveService } from "@/core/interfaces/active-service.interface";
import { SubCategory } from "@/core/interfaces/service.interface";
import { Input } from "@/presentation/components/ui/input";
import { Switch } from "@/presentation/components/ui/switch";
import { Text } from "@/presentation/components/ui/text";
import { View } from "react-native";
import { Save } from "@/lib/icons/Icons";
import { useBusinessServiceCard } from "@/presentation/hooks";
import { Button } from "@/presentation/components/ui/button";
import { LoadingIndicator } from "../shared/LoadingIndicator";

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
    service,
    saveLoading,
    onChangeDuration,
    onChangePrice,
    onCheckedChange,
    onSave,
  } = useBusinessServiceCard({ subcategory, businessId, callback });

  return (
    <View className="my-2">
      <View className="flex flex-row justify-between items-center">
        <Text className="my-2 font-baloo-bold text-xl">{subcategory.name}</Text>
        <View className="flex flex-row gap-2 items-center">
          {subcategory.service.id && !saveLoading && (
            <Button onPress={onSave} variant={"ghost"} size={"icon"}>
              <Save className="text-foreground" size={30} />
            </Button>
          )}
          {saveLoading && <LoadingIndicator />}
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
            <Input
              readOnly={loading}
              placeholder="Duración"
              inputMode="numeric"
              value={`${service.duration}`}
              onChangeText={onChangeDuration}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
