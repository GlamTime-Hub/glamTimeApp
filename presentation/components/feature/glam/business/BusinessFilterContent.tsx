import { BusinessType } from "@/core/interfaces/business-type.interface";
import { Category } from "@/core/interfaces/category.interface";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import { Text } from "@/presentation/components/ui/text";
import { useBusinessFilter } from "@/presentation/hooks";
import { Controller } from "react-hook-form";
import { ScrollView, View } from "react-native";

export const BusinessFilterContent = () => {
  const {
    control,
    businessTypes,
    cateogries,
    cities,
    contentInsets,
    handleSubmit,
    onSubmit,
    onResetFilters,
  } = useBusinessFilter();

  return (
    <View className="flex-1 justify-between">
      <View className="">
        <Text className="font-baloo-bold">
          Usa los siguientes filtros para buscar tu sitio ideal.
        </Text>
        <View className="mt-4 mb-2">
          <Text className="font-baloo-bold mb-1">Nombre</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Nombre"
              />
            )}
          />
        </View>
        <View className="my-2">
          <Text className="font-baloo-bold mb-1">Por ciudad</Text>
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange } }) => (
              <Select
                onValueChange={(value) => {
                  onChange(value?.value);
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Ciudad"
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="w-full">
                  <ScrollView className="max-h-80 ">
                    <SelectGroup>
                      {cities?.map((city) => (
                        <SelectItem
                          key={city.id}
                          label={city.name}
                          value={city.id}
                        >
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollView>
                </SelectContent>
              </Select>
            )}
          />
        </View>
        <View className="my-2">
          <Text className="font-baloo-bold mb-1">Por tipo de negocio</Text>
          <Controller
            control={control}
            name="businessType"
            render={({ field: { onChange } }) => (
              <Select
                onValueChange={(value) => {
                  onChange(value?.value);
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Tipo de negocio"
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="w-full">
                  <ScrollView className="max-h-80 ">
                    <SelectGroup>
                      {businessTypes?.map((type: BusinessType) => (
                        <SelectItem
                          key={type.id}
                          label={type.type}
                          value={type.id}
                        >
                          {type.type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollView>
                </SelectContent>
              </Select>
            )}
          />
        </View>
        <View className="my-2">
          <Text className="font-baloo-bold mb-1">Por categoria</Text>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange } }) => (
              <Select
                onValueChange={(value) => {
                  onChange(value?.value);
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Categoría"
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="w-full">
                  <ScrollView className="max-h-80 ">
                    <SelectGroup>
                      {cateogries?.map((category: Category) => (
                        <SelectItem
                          key={category.id}
                          label={category.name}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollView>
                </SelectContent>
              </Select>
            )}
          />
        </View>
      </View>
      <View className="gap-2">
        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Aplicar</Text>
        </Button>
        <Button variant={"secondary"} onPress={onResetFilters}>
          <Text>Limpiar</Text>
        </Button>
      </View>
    </View>
  );
};
