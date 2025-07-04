import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import { Text } from "./text";
import { Button } from "./button";
import { Pressable, TouchableOpacity, View } from "react-native";

interface Props {
  title?: string;
  isIcon: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  labelIcon?: string;
  closeLabel: string;
  callback?: () => void;
  disabled?: boolean;
  className?: string;
  buttonVariant?: "default" | "outline" | "destructive";
}

export const CustomDialog = ({
  isIcon,
  title,
  children,
  icon,
  closeLabel,
  className,
  disabled = false,
  buttonVariant = "default",
  callback,
}: Props) => {
  return (
    <Dialog className={className}>
      <DialogTrigger asChild>
        {!isIcon ? (
          <Button disabled={disabled} variant={buttonVariant}>
            <Text className="font-baloo-bold">{title}</Text>
          </Button>
        ) : (
          <TouchableOpacity className="flex-row gap-2 px-4 text-end">
            {icon}
          </TouchableOpacity>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="py-4">{children}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onPress={callback}
              variant={buttonVariant}
              className="flex flex-row gap-2"
            >
              <Text>{closeLabel}</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
