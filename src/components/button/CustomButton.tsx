import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ButtonProps as RNButtonProps,
} from "react-native";
import { useTheme } from "@react-navigation/native";

interface ButtonProps extends RNButtonProps {
  outlined?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  color,
  outlined = false,
  loading = false,
}) => {
  const { colors } = useTheme();
  const buttonColor = color ?? colors.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        outlined
          ? {
              borderWidth: 1,
              borderColor: buttonColor,
              backgroundColor: "transparent",
            }
          : {
              backgroundColor: buttonColor,
            },
        (disabled || loading) && styles.disabled,
      ]}
    >
      {
        loading &&
          <ActivityIndicator
            style={{ marginRight: 8, opacity: loading ? 1 : 0 }}
            size="small"
            color={outlined ? buttonColor : "#fff"}
          />
      }

      <Text
        style={[
          styles.text,
          { color: outlined ? buttonColor : "#fff" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    height: 44,
    borderRadius: 8,
    flexDirection: "row", // ✅ horizontal layout
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.4,
  },
});
