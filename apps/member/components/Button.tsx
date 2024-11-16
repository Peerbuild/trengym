import { Pressable, View } from "react-native";
import React from "react";
import Text from "./Text";

interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <Pressable className="w-full rounded-full bg-primary p-4">
      <Text className="text-center text-lg text-primary-foreground">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
