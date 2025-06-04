import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { ChevronDown, ChevronUp } from "@/lib/icons/Icons";
import { Text } from "./text";
import { useColorScheme } from "@/lib/useColorScheme";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const CustomCollapsible = ({ title, children }: Props) => {
  const [open, setOpen] = useState(false);
  const { titleColor, colorIcons } = useColorScheme();

  return (
    <Collapsible
      onOpenChange={() => setOpen(!open)}
      className=" px-2 py-4 rounded-lg"
    >
      <CollapsibleTrigger className="flex flex-row justify-between">
        <Text
          className={`font-baloo-bold ml-2 text-xl text-primary ${titleColor}`}
        >
          {title}
        </Text>
        {open ? (
          <ChevronUp className={colorIcons} />
        ) : (
          <ChevronDown className={colorIcons} />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="my-2">{children}</CollapsibleContent>
    </Collapsible>
  );
};
