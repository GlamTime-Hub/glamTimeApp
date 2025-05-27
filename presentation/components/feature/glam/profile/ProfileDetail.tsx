import { Platform, ScrollView, View } from "react-native";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PhoneNumber } from "@/presentation/components/ui/PhoneNumber";
import { Error } from "../shared/Error";
import Toast from "react-native-toast-message";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { ProfileDetailLoading } from "./ProfileDetailLoading";

export const ProfileDetail = () => {
  const {
    backendError,
    isLoading,
    MONTHS,
    DAYS,
    GENDER,
    user,
    loading,
    countries,
    cities,
    control,
    errors,
    onChangeCountry,
    onChangePhone,
    handleSubmit,
    onSave,
  } = useProfileDetail();

  const insets = useSafeAreaInsets();
  const isIos = Platform.OS === "ios";

  const contentInsets1 = {
    top: insets.top,
    bottom: insets.bottom,
    left: 35,
    right: isIos ? 200 : 230,
  };

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 35,
    right: 35,
  };

  const contentInsets2 = {
    top: insets.top,
    bottom: insets.bottom,
    left: isIos ? 195 : 225,
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
                  <View className="flex flex-row">
                    <View className="w-1/2 pr-2">
                      <Controller
                        control={control}
                        name="birthDay"
                        render={({ field: { onChange, value } }) => (
                          <Select
                            disabled={loading}
                            onValueChange={(value) => {
                              onChange(value?.value);
                            }}
                            value={{
                              value,
                              label: value,
                            }}
                          >
                            <SelectTrigger disabled={loading}>
                              <SelectValue
                                className="text-foreground text-sm native:text-lg"
                                placeholder="Día"
                              />
                            </SelectTrigger>
                            <SelectContent
                              insets={contentInsets1}
                              className="w-full"
                            >
                              <ScrollView className="max-h-80">
                                <SelectGroup>
                                  <SelectLabel>Día</SelectLabel>
                                  {DAYS.map((day) => (
                                    <SelectItem
                                      key={day}
                                      label={day}
                                      value={day}
                                    >
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
                        render={({ field: { onChange, value } }) => (
                          <Select
                            disabled={loading}
                            onValueChange={(value) => {
                              onChange(value?.value);
                            }}
                            value={{
                              value: `${value}`,
                              label:
                                MONTHS.find((m) => m.value === parseInt(value))
                                  ?.label ?? "",
                            }}
                          >
                            <SelectTrigger disabled={loading}>
                              <SelectValue
                                className="text-foreground text-sm native:text-lg"
                                placeholder="Mes"
                              />
                            </SelectTrigger>
                            <SelectContent
                              insets={contentInsets2}
                              className="w-full"
                            >
                              <ScrollView className="max-h-80">
                                <SelectGroup>
                                  <SelectLabel>Mes</SelectLabel>
                                  {MONTHS.map((month) => (
                                    <SelectItem
                                      key={month.label}
                                      label={month.label}
                                      value={`${month.value}`}
                                    >
                                      <Text>{month.label}</Text>
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
                <View className="my-2">
                  <Text className="font-baloo-bold mb-1">
                    Como te identificas
                  </Text>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        disabled={loading}
                        value={{
                          value,
                          label:
                            GENDER.find((g) => g.value === value)?.label ?? "",
                        }}
                        onValueChange={(value) => {
                          onChange(value?.value);
                        }}
                      >
                        <SelectTrigger disabled={loading}>
                          <SelectValue
                            className="text-foreground text-sm native:text-lg"
                            placeholder="Género"
                          />
                        </SelectTrigger>
                        <SelectContent
                          insets={contentInsets}
                          className="w-full"
                        >
                          <ScrollView className="max-h-80">
                            <SelectGroup>
                              <SelectLabel>Género</SelectLabel>
                              {GENDER.map((gender) => (
                                <SelectItem
                                  key={gender.value}
                                  label={gender.label}
                                  value={gender.value}
                                >
                                  {gender.label}
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
                  <Text className="font-baloo-bold mb-1">
                    Te encuentras en:
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
                  <Controller
                    control={control}
                    name="city"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        disabled={loading}
                        onValueChange={(value) => {
                          onChange(value?.value);
                        }}
                        value={{
                          value,
                          label:
                            cities?.find((c) => c.id === value)?.name ?? "",
                        }}
                      >
                        <SelectTrigger disabled={loading}>
                          <SelectValue
                            className="text-foreground text-sm native:text-lg"
                            placeholder="Ciudad"
                          />
                        </SelectTrigger>
                        <SelectContent
                          insets={contentInsets}
                          className="w-full"
                        >
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
