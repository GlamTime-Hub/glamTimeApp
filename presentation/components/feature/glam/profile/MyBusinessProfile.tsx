import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { Text } from "@/presentation/components/ui/text";
import {
  useBusinessDetail,
  useProfileBusinessDetail,
} from "@/presentation/hooks";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { AlertTriangle, SquarePen } from "@/lib/icons/Icons";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Controller } from "react-hook-form";
import { Input } from "@/presentation/components/ui/input";
import { PhoneNumber } from "@/presentation/components/ui/PhoneNumber";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import { Button } from "@/presentation/components/ui/button";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { BusinessType } from "@/core/interfaces/business-type.interface";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

export const MyBusinessProfile = () => {
  const { id } = useLocalSearchParams();

  const {
    businessTypes,
    business,
    control,
    errors,
    loading,
    contentInsets,
    countries,
    cities,
    handleSubmit,
    onChangeCountry,
    onChangePhone,
    onSubmit,
    onUpdateRegion,
  } = useProfileBusinessDetail(id as string);

  return (
    <View className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {id === "new" ? (
          <Text className="my-6 font-baloo-bold text-xl">
            Ingresa los datos básicos de tu negocio
          </Text>
        ) : (
          <Text className="font-baloo-bold text-xl my-6">
            Mantén actualizada la información de tu negocio
          </Text>
        )}

        {id !== "new" && !business?.location.address && (
          <View className="my-4">
            <CustomAlert
              title="Info!!!"
              description="Debes seleccionar la ubicación y la imagen de tu negocio para
                que los clientes puedan encontrarte."
              type="destructive"
            />
          </View>
        )}

        <Card className="py-4">
          <CardContent className="px-4">
            <View className="my-2">
              <Text className="font-baloo-bold">
                ¿Cómo se llama tu negocio?
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    readOnly={loading}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Nombre"
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.name && (
                <Text className="text-red-500 text-sm">
                  {errors.name.message}
                </Text>
              )}
            </View>

            <View className="my-2">
              <Text className="font-baloo-bold">Número de contacto</Text>
              <PhoneNumber
                initialPhoneNumber={business ? `${business?.phoneNumber}` : ""}
                onChangeCountry={onChangeCountry}
                onChangePhone={onChangePhone}
                disabled={loading}
              />
              {errors.phoneNumber && (
                <Text className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>

            <View className="my-2">
              <Text className="font-baloo-bold mb-1">Correo electronico</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Email"
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm">
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View className="my-2">
              <Text className="font-baloo-bold">Tipo de negocio</Text>
              <Controller
                control={control}
                name="businesstype"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={(value) => {
                      onChange(value?.value);
                    }}
                    value={
                      value
                        ? {
                            value,
                            label:
                              businessTypes?.find((c: any) => c.id === value)
                                ?.type ?? "",
                          }
                        : undefined
                    }
                    disabled={id !== "new"}
                  >
                    <SelectTrigger disabled={id !== "new"}>
                      <SelectValue
                        className="text-foreground text-sm native:text-lg"
                        placeholder="Tipo de negocio"
                      />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-full">
                      <ScrollView className="max-h-80 ">
                        <SelectGroup>
                          {businessTypes?.map((businessType: BusinessType) => (
                            <SelectItem
                              key={businessType.id}
                              label={businessType.type}
                              value={businessType.id}
                            >
                              {businessType.type}
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
              <Text className="font-baloo-bold">Selecciona tu país</Text>
              <Controller
                control={control}
                name="country"
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={(value) => {
                      onChange(value?.value);
                    }}
                    value={{
                      value,
                      label: countries?.find((c) => c.id === value)?.name ?? "",
                    }}
                    disabled={true}
                  >
                    <SelectTrigger disabled={true}>
                      <SelectValue
                        className="text-foreground text-sm native:text-lg"
                        placeholder="País"
                      />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-full">
                      <ScrollView className="max-h-80 ">
                        <SelectGroup>
                          {countries?.map((country) => (
                            <SelectItem
                              key={country.id}
                              label={country.name}
                              value={country.id}
                            >
                              {country.name}
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
              <Text className="font-baloo-bold mb-1">Selecciona tu ciudad</Text>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value } }) => (
                  <Select
                    disabled={loading}
                    onValueChange={(value) => {
                      onChange(value?.value);
                    }}
                    value={
                      value
                        ? {
                            value,
                            label:
                              cities?.find((c) => c.id === value)?.name ?? "",
                          }
                        : undefined
                    }
                  >
                    <SelectTrigger disabled={loading}>
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
              {errors.city && (
                <Text className="text-red-500 text-sm">
                  {errors.city.message}
                </Text>
              )}
            </View>
          </CardContent>
        </Card>

        <View className="flex-1 my-4">
          {id !== "new" && !business?.location && (
            <Button
              onPress={() =>
                router.push("/glam/(tabs)/profile/my-business/location")
              }
            >
              <Text>Selecciona la ubicación de tu negocio</Text>
            </Button>
          )}

          {business?.location && (
            <View className="my-4">
              <Card>
                <CardContent className="py-4">
                  <View className="relative">
                    <Text className="font-baloo-bold text-lg">Dirección:</Text>
                    <Text>{business.location.address}</Text>
                    <View className="absolute top-0 right-0">
                      <Button
                        onPress={onUpdateRegion}
                        variant={"ghost"}
                        size={"icon"}
                      >
                        <SquarePen className="text-foreground" />
                      </Button>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </View>
          )}
        </View>
      </ScrollView>

      <Button onPress={handleSubmit(onSubmit)} className="flex flex-row gap-2">
        {loading && <LoadingIndicator />}
        <Text>Guardar</Text>
      </Button>
    </View>
  );
};
