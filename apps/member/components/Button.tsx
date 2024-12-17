import { Pressable } from "react-native";
import React from "react";
import Text from "./Text";
import { IconLoader } from "@tabler/icons-react-native";
import { PressableProps } from "react-native";
import { vars } from "nativewind";
import { ActivityIndicator } from "react-native";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = ({ children, isLoading, ...props }: ButtonProps) => {
  return (
    <Pressable
      {...props}
      disabled={isLoading}
      className="group w-full flex-row justify-center gap-3 rounded-full bg-primary p-4 active:bg-primary/80 disabled:bg-primary/60"
    >
      {isLoading && <ActivityIndicator />}
      <Text className="text-center text-lg text-primary-foreground group-disabled:text-muted-foreground">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
