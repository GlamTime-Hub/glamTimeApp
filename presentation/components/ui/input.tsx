import { cn } from "@/lib/util";
import * as React from "react";
import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  type TextInputProps,
} from "react-native";

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        "web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2  lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-sm placeholder:text-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
