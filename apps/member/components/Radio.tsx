import { Pressable, View } from "react-native";
import Text from "./Text";
import { cn } from "@trengym/ui/lib/utils";

export default function RadioItem({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Pressable className={cn("flex-row items-center gap-4", className)}>
      <View className="size-6 rounded-full border-2 border-white" />
      {children}
    </Pressable>
  );
}
