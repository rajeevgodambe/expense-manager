import { View } from "react-native";
import ThemedText from "../text/ThemedText";
import { StyleSheet } from "react-native/types_generated/index";

const Snackbar = ({ visible, message }: { visible: boolean; message: string }) => {
  if (!visible) return null;

  return (
    <View style={styles.snackbar}>
      <ThemedText style={styles.snackbarText}>{message}</ThemedText>
    </View>
  );
};


const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#D32F2F',
    padding: 14,
    borderRadius: 8,
    elevation: 6,
  },
  snackbarText: {
    color: '#fff',
    textAlign: 'center',
  },
});



export {Snackbar}