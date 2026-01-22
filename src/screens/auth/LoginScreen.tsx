import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import bcrypt from "react-native-bcrypt";
import Input from "../../components/input/Input";
import Button from "../../components/button/CustomButton";
import ThemedText from "../../components/text/ThemedText";
import { useTheme } from "@react-navigation/native";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { AuthContext } from "../../navigation/AuthContext";
import { Q } from "@nozbe/watermelondb";

export default function LoginScreen({ navigation }) {
  const database = useDatabase();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const user = (
        await database.collections
          .get("users")
          .query(Q.where("email", email))
          .fetch()
      )[0];

      if (!user) {
        Alert.alert("Error", "User not found");
        setLoading(false);
        return;
      }

      const isValid = bcrypt.compareSync(password, user.password);

      if (isValid) {
        // Alert.alert("Success", "Login Successful");
        const userData = {
          id: user.id,
          email: user.email,
          name: user.name,
        };

        signIn(userData);
      } else {
        Alert.alert("Error", "Invalid Credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Login failed. Try again later");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#fff",
        padding: 24,
        justifyContent: "center",
      }}
    >
      <ThemedText style={{ fontSize: 32, fontWeight: "700", marginBottom: 12 }}>
        Welcome Back
      </ThemedText>

      <ThemedText style={{ color: "#666", marginBottom: 24 }}>
        Login to your account to continue
      </ThemedText>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ fontSize: 16, marginBottom: 16 }}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={{ fontSize: 16, marginBottom: 16 }}
      />

      <View style={{ flexDirection: "row" }}>
        <Button loading={loading} onPress={handleLogin} title="Login" />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        style={{ marginTop: 16, alignItems: "center" }}
      >
        <Text style={{ color: "#666" }}>
          Don’t have an account?{" "}
          <Text style={{ color: colors?.secondary, fontWeight: "700" }}>
            Signup
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
