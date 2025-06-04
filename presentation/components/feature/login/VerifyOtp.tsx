import { useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import { View } from "react-native";

import { useLogin } from "@/presentation/hooks";
import { Button } from "../../ui/button";
import { Text } from "../../ui/text";
import { useColorScheme } from "@/lib/useColorScheme";
import { LoadingIndicator } from "../glam/shared/LoadingIndicator";

export const VerifyOtp = () => {
  const { verifyOtp, loading } = useLogin();

  const [otp, setOtp] = useState<string>("");

  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex m-6 ">
      <View className="mt-20">
        <Text className="text-xl mb-4 text-center font-baloo-bold ">
          Ingresa el código de verificación
        </Text>
        <View className="flex-row  items-center ">
          <OTPTextInput
            inputCellLength={1}
            inputCount={6}
            autoFocus={true}
            textInputStyle={{
              color: isDarkColorScheme ? "#F5F5F5" : "#09090A",
              width: 40,
            }}
            tintColor={"#9D84B3"}
            containerStyle={{
              width: 120,
              marginLeft: 25,
            }}
            handleTextChange={(text) => setOtp(text)}
          />
        </View>

        <Button
          className="mt-4 flex flex-row gap-2"
          onPress={() => verifyOtp(otp)}
        >
          {loading && <LoadingIndicator />}
          <Text>Verificar</Text>
        </Button>
      </View>
    </View>
  );
};
