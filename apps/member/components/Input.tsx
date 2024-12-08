import { TextInput, TextInputProps } from "react-native";
import React from "react";
import { cn } from "@trengym/ui/lib/utils";

const Input = React.forwardRef<
  TextInput,
  TextInputProps & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn("rounded-lg bg-muted p-3 text-foreground", className)}
      placeholderTextColor={"#757577"}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
