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

  return (
    <Alert
      icon={isDefault ? Bell : AlertTriangle}
      iconClassName="text-primary mt-4"
      variant={isDefault ? "default" : "destructive"}
      className="max-w-xl  "
    >
      <AlertTitle>
        <Text className="text-primary font-baloo-bold">{title}</Text>
      </AlertTitle>
      <AlertDescription>
        <Text>{description}</Text>
      </AlertDescription>
    </Alert>
  );
};
