import { cn } from "@/lib/util";
import { View } from "react-native";
import { DrawerLayout } from "react-native-gesture-handler";

interface Props {
  children: React.ReactNode;
  drawerContent: React.ReactNode;
  drawerRef: React.RefObject<any>;
}
export const Drawer = ({ children, drawerRef, drawerContent }: Props) => {
  const renderDrawerContent = () => (
    <View className={cn("flex-1 p-5 bg-background")}>{drawerContent}</View>
  );

  return (
    <View style={{ flex: 1 }}>
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={renderDrawerContent}
      >
        {children}
      </DrawerLayout>
    </View>
  );
};
