import { Drawer } from "@/presentation/components/ui/Drawer";
import { useRef } from "react";
import { BusinessContent } from "./BusinessContent";
import { BusinessFilterContent } from "./BusinessFilterContent";

export const Business = () => {
  const drawerRef = useRef<any>(null);

  return (
    <Drawer drawerRef={drawerRef} drawerContent={<BusinessFilterContent />}>
      <BusinessContent drawerRef={drawerRef} />
    </Drawer>
  );
};
