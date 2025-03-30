import { Stack } from "expo-router";

const SignUpScreen = () => {
  return (
    <Stack initialRouteName="credentials/index">
      <Stack.Screen
        name="credentials/index"
        options={{
          title: "Únete a GlamTime",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="user-info/index"
        options={{
          title: "Solo un paso más",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default SignUpScreen;
