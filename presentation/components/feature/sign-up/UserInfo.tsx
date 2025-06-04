import { View } from "react-native";
import { Button } from "../../ui/button";
import { Text } from "../../ui/text";
import { useUserInfo } from "@/presentation/hooks";
import { Controller } from "react-hook-form";
import { Input } from "../../ui/input";

import { CustomInputPicker } from "../../ui/CustomInputPicker";

export const UserInfo = () => {
  const {
    control,
    valuesModal,
    errors,
    MONTHS,
    DAYS,
    GENDER,
    cities,
    openModal,
    handleSubmit,
    setValuesModal,
    onSubmit,
    setValue,
    setOpenModal,
  } = useUserInfo();

  return (
    <View className="px-10 py-5 flex-1 flex justify-between">
      <View>
        <View className="my-2">
          <Text className="font-baloo-bold mb-1">¿Cómo te llamas?</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Nombre"
                keyboardType="email-address"
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500 text-sm">{errors.name.message}</Text>
          )}
        </View>
        <View className="my-2">
          <Text className="font-baloo-bold mb-1">
            ¿Cuál es tu correo electrónico?
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Correo"
              />
            )}
          />
        </View>
        <View className="my-2">
          <Text className="font-baloo-bold mb-1">
            ¿Cuándo es tu cumpleaños?
          </Text>
          <View className="flex flex-row">
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
                    day: itemValue,
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
                  MONTHS.find((m) => m.value === `${valuesModal.month}`) || {
                    value: "",
                    label: "",
                  }
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
        <View>
          <Text className="font-baloo-bold mb-1">¿Cómo te identificas?</Text>
          <CustomInputPicker
            label="Género"
            placeHolder="Cómo te identificas"
            value={
              GENDER.find((m) => m.value === `${valuesModal.gender}`) || {
                value: "",
                label: "",
              }
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
            ¿En que ciudad te encuentras?
          </Text>
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
            <Text className="text-red-500 text-sm">{errors.city.message}</Text>
          )}
        </View>
      </View>
      <View>
        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Guardar</Text>
        </Button>
      </View>
    </View>
  );
};
