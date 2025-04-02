import { cn } from "@/lib/util";
import * as AvatarPrimitive from "@rn-primitives/avatar";
import * as React from "react";

const sizeClasses: Record<string, string> = {
  default: "h-20 w-20",
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-20 w-20",
  xl: "h-28 w-28",
  "2xl": "h-36 w-36",
};

const Avatar = React.forwardRef<
  AvatarPrimitive.RootRef,
  AvatarPrimitive.RootProps & { size?: keyof typeof sizeClasses }
>(({ className, size = "default", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full",
      sizeClasses[size],
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  AvatarPrimitive.ImageRef,
  AvatarPrimitive.ImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  AvatarPrimitive.FallbackRef,
  AvatarPrimitive.FallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
