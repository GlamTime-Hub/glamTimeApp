import { View } from "react-native";
import React from "react";
import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={() => router.push("/sign-up/user-info")}>
        <Text>Go edit</Text>
      </Button>
    </View>
  );
}
