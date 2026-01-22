import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const createCardStyles = (theme: Theme) =>
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

    
  });

  export {
    createCardStyles
  }