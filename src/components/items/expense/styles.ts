import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const createExpenseItemStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 20,
      padding: 12,
      marginBottom: 14,
      marginLeft: 2,
      marginRight: 2,
      // Android
      elevation: 2,

      // iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
    },

    iconWrapper: {
      width: 46,
      height: 46,
      borderRadius: 26,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },

    icon: {
      width: 26,
      height: 26,
      tintColor: theme.colors.text,
    },

    content: {
      flex: 1,
      marginLeft: 16,
    },

    title: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
    },

    subtitle: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.7,
      marginTop: 4,
    },

    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  export {
    createExpenseItemStyles
  }