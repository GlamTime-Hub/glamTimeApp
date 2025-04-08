import { ScrollView, View } from "react-native";

import { CustomAvatar } from "@/presentation/components/ui/CustomAvatar";
import { Input } from "@/presentation/components/ui/input";
import { Text } from "@/presentation/components/ui/text";
import { PhoneNumber } from "@/presentation/components/ui/PhoneNumber";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { SquarePen } from "@/lib/icons/Icons";
import { MyBusinessDetailProfessionalCard } from "./MyBusinessDetailProfessionalCard";
import { useBusinessDetail } from "@/presentation/hooks";
import { Controller } from "react-hook-form";
import { GoogleMaps } from "../shared/GoogleMaps";
import { CustomDialog } from "@/presentation/components/ui/CustomDialog";
import { MyBusinessDetailLoading } from "./MyBusinessDetailLoading";

export const MyBusinessDetail = ({ id }: { id: string }) => {
  const {
    business,
    control,
    errors,
    loading,
    isLoading,
    contentInsets,
    countries,
    cities,
    region,
    updateImage,
    onChangeCountry,
    onChangePhone,
    handleSubmit,
    onSubmit,
    setRegion,
  } = useBusinessDetail(id);

  if (isLoading) {
    return <MyBusinessDetailLoading />;
  }

  return (
    <View className="flex-1 flex-col justify-evenly px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {id === "new" && (
          <Text className="my-6 font-bold text-xl">
            Ingresa los datos básicos de tu negocio
          </Text>
        )}

        {id !== "new" && (
          <View>
            <Text className="font-bold my-4 text-lg">
              Selecciona la imagen de tu negocio
            </Text>
            <View className="flex items-center">
              <CustomAvatar
                defaultImage={business?.urlPhoto}
                id={business?.id ?? ""}
                isUserImage={false}
                callback={updateImage}
              />
            </View>
          </View>
        )}

        <Card className="py-4">
          <CardContent className="px-4">
            <View className="my-2">
              <Text className="font-bold">¿Cómo se llama tu negocio?</Text>
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
              <Text className="font-bold">Ingresa número de contacto</Text>
              <PhoneNumber
                initialPhoneNumber={`${business?.phoneNumber}`}
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
              <Text className="font-bold mb-1">Correo electronico</Text>
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
              <Text className="font-bold">País donde está tu negocio</Text>
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
              <Text className="font-bold mb-1">
                Ciudad donde está tu negocio
              </Text>
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
          {id === "new" && (
            <CustomDialog
              isIcon={false}
              title="Selecciona tu ubicación"
              closeLabel="Confirmar"
            >
              <GoogleMaps region={region} setRegion={setRegion} />
            </CustomDialog>
          )}

          {errors.location?.address && (
            <Text className="text-red-500 text-sm">
              {errors.location.address.message}
            </Text>
          )}

          {region.address && (
            <View className="my-4">
              <Card>
                <CardContent className="py-4">
                  <View className="relative">
                    <Text className="font-bold text-lg">Direccion:</Text>
                    <Text>{region.address}</Text>
                    <View className="absolute top-0 right-0">
                      <CustomDialog
                        isIcon={true}
                        icon={<SquarePen className="text-foreground" />}
                        title="Selecciona tu ubicación"
                        closeLabel="Confirmar"
                      >
                        <GoogleMaps region={region} setRegion={setRegion} />
                      </CustomDialog>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </View>
          )}
        </View>

        {/* only available after creating a business */}

        {id !== "new" && (
          <View>
            <View>
              <View className="my-2">
                <Text className="font-bold">Invitar Profesional</Text>
                <Input placeholder="Email del profesional" />
              </View>
              <Button variant={"outline"} className="mb-5">
                <Text>Invitar</Text>
              </Button>
            </View>
            <View>
              <MyBusinessDetailProfessionalCard />
              <MyBusinessDetailProfessionalCard />
            </View>
          </View>
        )}
      </ScrollView>

      <Button onPress={handleSubmit(onSubmit)} className="my-5">
        <Text>Guardar</Text>
      </Button>
    </View>
  );
};
