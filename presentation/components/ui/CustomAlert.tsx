import { useColorScheme } from "@/lib/useColorScheme";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Text } from "./text";

import { Bell, AlertTriangle } from "@/lib/icons/Icons";

interface Props {
  title: string;
  type: "info" | "destructive";
  description: string;
}

export const CustomAlert = ({ title, description, type }: Props) => {
  const isDefault = type === "info";

  const { titleColor } = useColorScheme();

  return (
    <Alert
      icon={isDefault ? Bell : AlertTriangle}
      variant={isDefault ? "default" : "destructive"}
      className="max-w-xl"
    >
      <AlertTitle>
        <Text className={`${titleColor} text-sm font-baloo-bold`}>{title}</Text>
      </AlertTitle>
      <AlertDescription>
        <Text className="text-md text-muted-foreground">{description}</Text>
      </AlertDescription>
    </Alert>
  );
};
