import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="mt-20">
        <Text>This screen doesn't exist.</Text>

        <Link href="/login">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
