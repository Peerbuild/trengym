import { Text as NativeText } from "react-native";
import { cn } from "@trengym/ui/lib/utils";
import React from "react";

const Text = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <NativeText className={cn("text-foreground", className)}>
      {children}
    </NativeText>
  );
};

export default Text;
