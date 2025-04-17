import { Platform, ScrollView, StyleSheet, View } from "react-native";

import { Text } from "@/presentation/components/ui/text";
import { ListFilter } from "@/lib/icons/Icons";
import { CustomDialog } from "@/presentation/components/ui/CustomDialog";
import { Controller } from "react-hook-form";
import { useBusinessFilter } from "@/presentation/hooks";
import { Input } from "@/presentation/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import {
  DrawerLayout,
  DrawerPosition,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Component, useRef } from "react";
import Animated from "react-native-reanimated";
import { Button } from "@/presentation/components/ui/button";

interface Props {
  callback: () => void;
}
export const BusinessFilter = ({ callback }: Props) => {
  return (
    <View>
      <Button
        className="flex flex-row gap-2 ml-4"
        variant={"ghost"}
        onPress={callback}
      >
        <ListFilter className="text-foreground" size={25} />
        <Text>Filtrar</Text>
      </Button>
    </View>
  );
};
