import { Text as NativeText, StyleProp, TextStyle } from "react-native";
import { cn } from "@trengym/ui/lib/utils";
import React from "react";

const Text = ({
  children,
  style,
  className,
}: {
  className?: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}) => {
  return (
    <NativeText
      style={style}
      className={cn("text-base text-foreground", className)}
    >
      {children}
    </NativeText>
  );
};

export default Text;
