import { Stack } from "expo-router";

const MyProfessionalLayout = () => {
  return (
    <Stack
      initialRouteName="home/[businessId]"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="home/[businessId]"
        options={{
          headerTitleAlign: "center",
          title: "Mis Profesionales",
        }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Detalle de Profesional",
        }}
      />
    </Stack>
  );
};

export default MyProfessionalLayout;
