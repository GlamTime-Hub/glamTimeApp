import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/util";
import { MoonStar, Sun } from "@/lib/icons/Icons";

import { Pressable, View } from "react-native";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? "light" : "dark";
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  }

  return (
    <Pressable
      onPress={toggleColorScheme}
      className="web:ring-offset-background  web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      {({ pressed }) => (
        <View
          className={cn(
            " aspect-square  justify-center items-start web:px-5",
            pressed && "opacity-70"
          )}
        >
          {isDarkColorScheme ? (
            <MoonStar className="text-white" size={23} strokeWidth={2} />
          ) : (
            <Sun className="text-primary" size={24} strokeWidth={2} />
          )}
        </View>
      )}
    </Pressable>
  );
}
