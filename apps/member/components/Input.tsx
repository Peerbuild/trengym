import { TextInput, TextInputProps } from "react-native";
import React from "react";
import { cn } from "@trengym/ui/lib/utils";

const Input = ({ className, ...props }: TextInputProps) => {
  return (
    <TextInput
      className={cn("rounded-lg bg-muted p-3 text-foreground", className)}
      placeholderTextColor={"#757577"}
      {...props}
    />
  );
};

export default Input;
