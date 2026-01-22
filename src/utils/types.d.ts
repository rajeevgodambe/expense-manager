import { Theme } from "@react-navigation/native";

export type AppTheme = Theme & {
  colors: Theme["colors"] & {
    secondary: string;
    success: string;
    warning: string;
    error: string;
    muted: string;
    overlay: string;
    inputBg: string;
  };
};
