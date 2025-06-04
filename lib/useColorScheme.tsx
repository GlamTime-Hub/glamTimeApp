import { useColorScheme as useNativewindColorScheme } from "nativewind";

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();
  const titleColor =
    colorScheme === "dark" ? "text-foreground" : "text-primary";

  const colorIcons = colorScheme === "dark" ? "text-white" : "text-primary";
  const backgroundColors =
    colorScheme === "dark" ? "bg-secondary" : "bg-primary";

  return {
    colorScheme: colorScheme ?? "dark",
    isDarkColorScheme: colorScheme === "dark",
    titleColor,
    colorIcons,
    backgroundColors,
    setColorScheme,
    toggleColorScheme,
  };
}
