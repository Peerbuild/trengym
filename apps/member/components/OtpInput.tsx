import { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

interface OTPInputProps {
  length: number;
  value: string;
  onChange: (otp: string) => void;
}

export default function OTPInput(props: OTPInputProps): React.JSX.Element {
  const { length, value, onChange } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRefs = useRef<TextInput[]>([]);
  const newValue = useRef<string[]>(["", "", "", "", "", ""]);

  const handleOnValueChange = (text: string, index: number) => {
    newValue.current[index] = text;

    onChange(newValue.current.join(""));
  };

  const handleChange = (text: string, index: number) => {
    handleOnValueChange(text, index);

    if (text.length > 0) {
      if (index < length - 1) {
        setCurrentIndex(index + 1);
      }
      return;
    }

    if (index > 0) {
      setCurrentIndex(index - 1);
    }
  };

  const handleBackspacePress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    const { nativeEvent } = e;

    if (nativeEvent.key === "Backspace") {
      handleChange("", index);
    }
  };

  useEffect(() => {
    inputRefs.current[currentIndex]?.focus();
  }, [currentIndex]);

  return (
    <View className="flex-row justify-between">
      {[...new Array(length)].map((_, ind) => {
        return (
          <TextInput
            ref={(ref) => {
              if (ref && !inputRefs.current.includes(ref)) {
                inputRefs.current = [...inputRefs.current, ref];
              }
            }}
            key={ind}
            contextMenuHidden
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            className="h-20 w-14 rounded-md bg-muted text-center text-2xl text-foreground"
            value={value[ind]}
            onChangeText={(text) => handleChange(text, ind)}
            onKeyPress={(e) => handleBackspacePress(e, ind)}
            editable={ind === currentIndex || value[ind] === ""}
          />
        );
      })}
    </View>
  );
}
