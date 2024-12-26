import { Pressable, View } from "react-native";
import { cn } from "@trengym/ui/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

const RadioContext = createContext<{
  value: string;
  setValue: (value: string) => void;
}>({
  value: "",
  setValue: () => {},
});

const useRadioContext = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error("useRadioContext must be used within a RadioGroup");
  }
  return context;
};

export function RadioGroup({
  children,
  className,
  onValueChange,
}: {
  children?: React.ReactNode;
  className?: string;
  onValueChange?: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    onValueChange && onValueChange(value);
  }, [value, onValueChange]);

  return (
    <RadioContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      <View className={cn("", className)}>{children}</View>
    </RadioContext.Provider>
  );
}

export function RadioItem({
  children,
  className,
  value,
}: {
  children?: React.ReactNode;
  className?: string;
  value: string;
}) {
  const { value: currVal, setValue } = useRadioContext();
  const isFocused = value === currVal;
  return (
    <Pressable
      className={cn(
        "flex-row items-center gap-4 border border-transparent shadow shadow-transparent transition-all",
        className,
        isFocused &&
          "border-foreground/40 bg-primary shadow-[var(--shadow-color)]",
      )}
      onPress={() => setValue(value)}
    >
      <View
        className={cn(
          "size-5 rounded-full border-[3px] border-muted-foreground transition-colors",
          isFocused && "border-white",
        )}
      />
      {children}
    </Pressable>
  );
}
