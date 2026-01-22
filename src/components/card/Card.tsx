import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { createCardStyles } from "./styles";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  activeOpacity = 0.8,
}) => {
    const theme = useTheme()
    const styles = createCardStyles(theme);
  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        style={[styles.card, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
};

export default React.memo(Card);
