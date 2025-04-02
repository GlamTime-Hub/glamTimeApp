import { ScrollView, View } from "react-native";
import { BusinessProfessionalCommentCard } from "./BusinessProfessionalCommentCard";
import { Text } from "@/presentation/components/ui/text";
import { Textarea } from "@/presentation/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/presentation/components/ui/button";

export const BusinessProfessionalComments = () => {
  const [value, setValue] = useState("");
  return (
    <View className="flex-1">
      <View className="flex-1">
        <View className="my-4">
          <Text className="font-bold my-2">Dejar comentario</Text>

          <Textarea
            placeholder="Comentario"
            value={value}
            onChangeText={setValue}
            aria-labelledby="textareaLabel"
            numberOfLines={4}
            className="text-sm"
          />
          <View className="flex flex-row mt-2 justify-end">
            <Button className="w-32" size={"sm"}>
              <Text>Enviar</Text>
            </Button>
          </View>
        </View>
        <View className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            <BusinessProfessionalCommentCard
              userUrlPhoto="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              rating={3}
              userName="Natalia Alvarez"
              comment="Juan ceballos es un profesional apasionado por su trabajo, sin duda recomendado"
            />
            <BusinessProfessionalCommentCard
              userUrlPhoto="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              rating={3.5}
              userName="Adrian Zarate"
              comment="Juan ceballos es un profesional apasionado por su trabajo, sin duda recomendado"
            />
            <BusinessProfessionalCommentCard
              userUrlPhoto="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              rating={4}
              userName="Gabriel Herrera"
              comment="Juan ceballos es un profesional apasionado por su trabajo, sin duda recomendado"
            />
            <BusinessProfessionalCommentCard
              userUrlPhoto="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              rating={3.5}
              userName="Carolina Alvarez"
              comment="Juan ceballos es un profesional apasionado por su trabajo, sin duda recomendado"
            />
            <BusinessProfessionalCommentCard
              userUrlPhoto="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              rating={3.5}
              userName="Carolina Alvarez"
              comment="Juan ceballos es un profesional apasionado por su trabajo, sin duda recomendado"
            />
            <BusinessProfessionalCommentCard
              userUrlPhoto="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              rating={3.5}
              userName="Carolina Alvarez"
              comment="Juan ceballos es un profesional apasionado por su trabajo, sin duda recomendado"
            />
            <BusinessProfessionalCommentCard
              userUrlPhoto="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              rating={3.5}
              userName="Carolina Alvarez"
              comment="Juan ceballos es un profesional apasionado por su trabajo, sin duda recomendado"
            />
            <BusinessProfessionalCommentCard
              userUrlPhoto="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              rating={3.5}
              userName="Camilo Torres"
              comment="Juan ceballos es un profesional apasionado por su trabajo, sin duda recomendado"
            />
            <BusinessProfessionalCommentCard
              userUrlPhoto="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              rating={3.5}
              userName="Manuela Beltran"
              comment="Juan ceballos es un profesional apasionado por su trabajo, sin duda recomendado"
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
