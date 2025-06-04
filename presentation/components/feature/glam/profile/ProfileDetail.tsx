import { ScrollView, View } from "react-native";
import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";
import { useProfileDetail } from "@/presentation/hooks/use-profile-detail.hook";
import { Controller } from "react-hook-form";
import { Input } from "@/presentation/components/ui/input";
import { Card, CardContent } from "@/presentation/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PhoneNumber } from "@/presentation/components/ui/PhoneNumber";
import { Error } from "../shared/Error";
import Toast from "react-native-toast-message";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { ProfileDetailLoading } from "./ProfileDetailLoading";
import { CustomInputPicker } from "@/presentation/components/ui/CustomInputPicker";

export const ProfileDetail = () => {
  const {
    backendError,
    isLoading,
    MONTHS,
    DAYS,
    GENDER,
    valuesModal,
    user,
    loading,
    countries,
    cities,
    control,
    errors,
    openModal,
    setOpenModal,
    onChangeCountry,
    onChangePhone,
    handleSubmit,
    onSave,
    setValuesModal,
    setValue,
  } = useProfileDetail();

  const insets = useSafeAreaInsets();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 35,
    right: 35,
  };

  if (backendError) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: backendError.message,
    });
    return <Error />;
  }

  if (isLoading) {
    return <ProfileDetailLoading />;
  }

  return (
    <View className="flex-1 p-6">
      <View className="flex flex-1 flex-col justify-between items-end ">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="my-6">
            <Text className="font-baloo-bold text-xl text-center">
              Mantén tus datos actualizados
            </Text>
            <Card className="mt-5">
              <CardContent>
                <View className="mt-4 mb-2">
                  <Text className="font-baloo-bold mb-1">Tu Nombre</Text>
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
                  <Text className="font-baloo-bold mb-1">
                    Tu Correo electronico
                  </Text>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        readOnly={loading}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Email"
                        keyboardType="email-address"
                      />
                    )}
                  />
                </View>
                <View className="my-2">
                  <Text className="font-baloo-bold mb-1">
                    Tu fecha de cumpleaños
                  </Text>
                  <View className="flex-row justify-between ">
                    <View className="w-1/2">
                      <CustomInputPicker
                        label="Día"
                        placeHolder="Selecciona el día"
                        value={{
                          label: `${valuesModal.day}`,
                          value: `${valuesModal.day}`,
                        }}
                        callback={(itemValue) => {
                          setValuesModal((prev) => ({
                            ...prev,
                            day: Number(itemValue),
                          }));
                          setValue("birthDay", itemValue);
                        }}
                        openModal={openModal.day}
                        setOpenModal={(open) =>
                          setOpenModal((prev) => ({ ...prev, day: open }))
                        }
                        items={DAYS.map((day) => ({ label: day, value: day }))}
                      />
                      {errors.birthDay && (
                        <Text className="text-red-500 text-sm">
                          {errors.birthDay.message}
                        </Text>
                      )}
                    </View>

                    <View className="w-1/2">
                      <CustomInputPicker
                        label="Mes"
                        placeHolder="Selecciona el mes"
                        value={
                          MONTHS.find(
                            (m) => m.value === `${valuesModal.month}`
                          ) || { value: "", label: "" }
                        }
                        callback={(itemValue) => {
                          setValuesModal((prev) => ({
                            ...prev,
                            month: `${itemValue}`,
                          }));
                          setValue("birthMonth", itemValue);
                        }}
                        openModal={openModal.month}
                        setOpenModal={(open) =>
                          setOpenModal((prev) => ({ ...prev, month: open }))
                        }
                        items={MONTHS.map((month) => ({
                          label: month.label,
                          value: `${month.value}`,
                        }))}
                      />
                      {errors.birthDay && (
                        <Text className="text-red-500 text-sm">
                          {errors.birthDay.message}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View className="my-2">
                  <Text className="font-baloo-bold mb-1">
                    Como te identificas
                  </Text>
                  <CustomInputPicker
                    label="Género"
                    placeHolder="Cómo te identificas"
                    value={
                      GENDER.find(
                        (m) => m.value === `${valuesModal.gender}`
                      ) || { value: "", label: "" }
                    }
                    callback={(itemValue) => {
                      setValuesModal((prev) => ({
                        ...prev,
                        gender: `${itemValue}`,
                      }));
                      setValue("gender", itemValue);
                    }}
                    openModal={openModal.gender}
                    setOpenModal={(open) =>
                      setOpenModal((prev) => ({ ...prev, gender: open }))
                    }
                    items={GENDER.map((month) => ({
                      label: month.label,
                      value: `${month.value}`,
                    }))}
                  />
                  {errors.gender && (
                    <Text className="text-red-500 text-sm">
                      {errors.gender.message}
                    </Text>
                  )}
                </View>

                <View className="my-2">
                  <Text className="font-baloo-bold mb-1">
                    Te encuentras ubicado en:
                  </Text>
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
                          label:
                            countries?.find((c) => c.id === value)?.name ?? "",
                        }}
                        disabled={true}
                      >
                        <SelectTrigger disabled={true}>
                          <SelectValue
                            className="text-foreground text-sm native:text-lg"
                            placeholder="País"
                          />
                        </SelectTrigger>
                        <SelectContent
                          insets={contentInsets}
                          className="w-full"
                        >
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
                  {errors.city && (
                    <Text className="text-red-500 text-sm">
                      {errors.city.message}
                    </Text>
                  )}
                </View>

                <View className="my-2">
                  <Text className="font-baloo-bold mb-1">En la ciudad de:</Text>
                  <CustomInputPicker
                    label="Ciudad"
                    placeHolder="Selecciona la ciudad"
                    value={
                      cities
                        ?.filter((m) => m.id === `${valuesModal.city}`)
                        ?.map((city) => ({
                          label: city.name,
                          value: city.id,
                        }))[0] || { value: "", label: "" }
                    }
                    callback={(itemValue) => {
                      setValuesModal((prev) => ({
                        ...prev,
                        city: `${itemValue}`,
                      }));
                      setValue("city", itemValue);
                    }}
                    openModal={openModal.city}
                    setOpenModal={(open) =>
                      setOpenModal((prev) => ({ ...prev, city: open }))
                    }
                    items={
                      cities?.map((city) => ({
                        label: city.name,
                        value: `${city.id}`,
                      })) ?? []
                    }
                  />
                  {errors.city && (
                    <Text className="text-red-500 text-sm">
                      {errors.city.message}
                    </Text>
                  )}
                </View>

                <View className="my-2">
                  <Text className="font-baloo-bold mb-1">
                    ¿Cómo es tu número movil?
                  </Text>
                  <PhoneNumber
                    initialPhoneNumber={user ? `${user?.phoneNumber}` : ""}
                    onChangeCountry={onChangeCountry}
                    onChangePhone={onChangePhone}
                    disabled={true}
                  />
                  {errors.phoneNumber && (
                    <Text className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </Text>
                  )}
                </View>
              </CardContent>
            </Card>
          </View>
        </ScrollView>
        <Button
          onPress={handleSubmit(onSave)}
          className="flex flex-row gap-2 w-full"
        >
          {loading && <LoadingIndicator />}
          <Text>Guardar</Text>
        </Button>
      </View>
    </View>
  );
};
