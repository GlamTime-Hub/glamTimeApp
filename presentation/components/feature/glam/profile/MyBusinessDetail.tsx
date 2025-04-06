import { ScrollView, TouchableOpacity, View } from "react-native";
import { useState } from "react";

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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { router } from "expo-router";

import { SquarePen } from "@/lib/icons/Icons";
import { MyBusinessDetailProfessionalCard } from "./MyBusinessDetailProfessionalCard";

export const MyBusinessDetail = () => {
  const [image, setImage] = useState<string>("");

  const insets = useSafeAreaInsets();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 15,
    right: 15,
  };

  return (
    <View className="flex-1 flex-col justify-evenly px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="font-bold my-4 text-lg text-center">
          Selecciona la imagen de tu negocio
        </Text>
        <CustomAvatar image={image} setImage={setImage} />
        <Card className="py-4">
          <CardContent className="px-4">
            <View className="mb-2">
              <Text className="font-bold">¿Cómo se llama tu negocio?</Text>
              <Input placeholder="Nombre" />
            </View>
            <View className="mb-2">
              <Text className="font-bold">Ingresa número de contacto</Text>
              <PhoneNumber />
            </View>

            <View className="mb-2">
              <Text className="font-bold">¿En que ciudad está ubicado?</Text>
              <Select
                onValueChange={(value) => {
                  //   onChange(value?.value);
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Ciudad"
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="w-full px-0 ">
                  <ScrollView className="max-h-80 ">
                    <SelectGroup className="p-0 m-0">
                      <SelectItem
                        className="p-0 m-0"
                        label="Barrancabermeja"
                        value={"barranca"}
                      >
                        Barrancabermeja
                      </SelectItem>
                      <SelectItem
                        className="p-0 m-0"
                        label="Barrancabermeja"
                        value={"barranca"}
                      >
                        Barrancabermeja
                      </SelectItem>
                    </SelectGroup>
                  </ScrollView>
                </SelectContent>
              </Select>
            </View>

            <View className="mb-2">
              <Text className="font-bold">Email de tu negocio</Text>
              <Input placeholder="Email" />
            </View>
          </CardContent>
        </Card>
        <View className="flex-1 my-4">
          <Button
            variant={"outline"}
            onPress={() =>
              router.push("/glam/(tabs)/profile/my-business/location")
            }
          >
            <Text className="font-bold">Selecciona tu ubicación</Text>
          </Button>
          <View className="my-4">
            <Card>
              <CardContent className="py-4">
                <View className="relative">
                  <Text className="font-bold text-lg">Direccion:</Text>
                  <Text>
                    La Corte Casa de Carnes , calle 58, Barrancabermeja ,
                    Santander, Colombia
                  </Text>

                  <TouchableOpacity className="absolute top-0 right-0">
                    <SquarePen className="text-foreground" />
                  </TouchableOpacity>
                </View>
              </CardContent>
            </Card>
          </View>
        </View>

        {/* only available after creating a business */}

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
      </ScrollView>

      <Button className="my-5">
        <Text>Guardar</Text>
      </Button>
    </View>
  );
};
