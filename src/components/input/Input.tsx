import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "../../utils/types";

type InputProps = TextInputProps & {
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
};

const Input: React.FC<InputProps> = ({
  style,
  rightIcon,
  containerStyle,
  ...props
}) => {
  const theme = useTheme() as AppTheme;

  return (
    <View style={[styles(theme).container, containerStyle]}>
      <TextInput
        style={[styles(theme).input, style]}
        {...props}
      />

      {rightIcon && (
        <View style={styles(theme).iconContainer}>
          {rightIcon}
        </View>
      )}
    </View>
  );
};

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
    },
    input: {
      height: 50,
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      backgroundColor: theme.colors.inputBg,
      color: theme.colors.text,
    },
    iconContainer: {
      position: "absolute",
      right: 12,
    },
  });

export default Input;
