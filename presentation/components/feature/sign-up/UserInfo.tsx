import { Platform, ScrollView, View } from "react-native";
import { Button } from "../../ui/button";
import { Text } from "../../ui/text";
import { useUserInfo } from "@/presentation/hooks";
import { Controller } from "react-hook-form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { PhoneNumber } from "../../ui/PhoneNumber";

export const UserInfo = () => {
  const {
    control,
    errors,
    MONTHS,
    DAYS,
    GENDER,
    CITIES,
    handleSubmit,
    onSubmit,
    onChangeCountry,
    onChangePhone,
  } = useUserInfo();

  const insets = useSafeAreaInsets();

  const isIos = Platform.OS === "ios";

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 35,
    right: 35,
  };

  const contentInsets1 = {
    top: insets.top,
    bottom: insets.bottom,
    left: 35,
    right: isIos ? 200 : 230,
  };

  const contentInsets2 = {
    top: insets.top,
    bottom: insets.bottom,
    left: isIos ? 195 : 225,
    right: 35,
  };

  return (
    <View className="px-10 py-5 h-full flex justify-between">
      <View>
        <Text className="text-center text-2xl font-bold my-4">
          ¡Hey! Cuéntanos
        </Text>

        <View className="my-2">
          <Text className="font-bold mb-1">¿Cómo te llamas?</Text>
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
          <Text className="font-bold mb-1">¿Cuándo es tu cumpleaños?</Text>
          <View className="flex flex-row">
            <View className="w-1/2 pr-2">
              <Controller
                control={control}
                name="birthDay"
                render={({ field: { onChange } }) => (
                  <Select
                    onValueChange={(value) => {
                      onChange(value?.value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        className="text-foreground text-sm native:text-lg"
                        placeholder="Día"
                      />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets1} className="w-full">
                      <ScrollView className="max-h-80">
                        <SelectGroup>
                          <SelectLabel>Día</SelectLabel>
                          {DAYS.map((day) => (
                            <SelectItem key={day} label={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </ScrollView>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.birthDay && (
                <Text className="text-red-500 text-sm">
                  {errors.birthDay.message}
                </Text>
              )}
            </View>
            <View className="w-1/2 ">
              <Controller
                control={control}
                name="birthMonth"
                render={({ field: { onChange } }) => (
                  <Select
                    onValueChange={(value) => {
                      onChange(value?.value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        className="text-foreground text-sm native:text-lg"
                        placeholder="Mes"
                      />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets2} className="w-full">
                      <ScrollView className="max-h-80">
                        <SelectGroup>
                          <SelectLabel>Mes</SelectLabel>
                          {MONTHS.map((month) => (
                            <SelectItem key={month} label={month} value={month}>
                              <Text>{month}</Text>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </ScrollView>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.birthMonth && (
                <Text className="text-red-500 text-sm">
                  {errors.birthMonth.message}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View>
          <Text className="font-bold mb-1">¿Cómo te identificas?</Text>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange } }) => (
              <Select
                onValueChange={(value) => {
                  onChange(value?.value);
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Género"
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="w-full">
                  <ScrollView className="max-h-80">
                    <SelectGroup>
                      <SelectLabel>Género</SelectLabel>
                      {GENDER.map((gender) => (
                        <SelectItem key={gender} label={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollView>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <Text className="text-red-500 text-sm">
              {errors.gender.message}
            </Text>
          )}
        </View>
        <View className="my-2">
          <Text className="font-bold mb-1">¿En que ciudad te encuentras?</Text>
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
                      <SelectLabel>Ciudad</SelectLabel>
                      {CITIES.map((city) => (
                        <SelectItem key={city} label={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollView>
                </SelectContent>
              </Select>
            )}
          />
          {errors.city && (
            <Text className="text-red-500 text-sm">{errors.city.message}</Text>
          )}
        </View>

        <View className="my-2">
          <Text className="font-bold mb-1">¿Cómo es tu número movil?</Text>
          <PhoneNumber
            initialPhoneNumber=""
            onChangeCountry={onChangeCountry}
            onChangePhone={onChangePhone}
          />
          {errors.phoneNumber && (
            <Text className="text-red-500 text-sm">
              {errors.phoneNumber.message}
            </Text>
          )}
        </View>
      </View>
      <View className="mb-5">
        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Continuar</Text>
        </Button>

        {isIos && (
          <Button
            className="mt-4"
            variant={"outline"}
            onPress={() => router.push("/sign-up/credentials")}
          >
            <Text>Volver</Text>
          </Button>
        )}
      </View>
    </View>
  );
};
