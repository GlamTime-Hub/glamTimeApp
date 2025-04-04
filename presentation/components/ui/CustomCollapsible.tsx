import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { ChevronDown, ChevronUp } from "@/lib/icons/Icons";
import { useColorScheme } from "@/lib/useColorScheme";
import { Text } from "./text";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const CustomCollapsible = ({ title, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      onOpenChange={() => setOpen(!open)}
      className=" px-2 py-4 rounded-lg"
    >
      <CollapsibleTrigger className="flex flex-row justify-between">
        <Text className="font-bold text-xl">{title}</Text>
        {open ? (
          <ChevronDown className="text-foreground" />
        ) : (
          <ChevronUp className="text-foreground" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="my-2">{children}</CollapsibleContent>
    </Collapsible>
  );
};
