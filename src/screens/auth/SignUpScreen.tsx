import React, { useState } from "react";
import {
    View,
    Text,
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
import { Q } from "@nozbe/watermelondb";
import { addDefaultCategories } from "../../database/database";
import User from "../../database/models/user";


export default function SignupScreen({ navigation }) {
    const database = useDatabase();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        setLoading(true);

        try {
            // Check if user already exists
            const existingUser = (
                await database.collections
                    .get("users")
                    .query(Q.where("email", email))
                    .fetch()
            )[0];

            if (existingUser) {
                Alert.alert("Error", "User already exists");
                setLoading(false);
                return;
            }

            // Hash the password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            // Save to WatermelonDB
            const user: User = await database.write(async () => {
                return await database.collections.get("users").create((user) => {
                    user.name = name;
                    user.email = email;
                    user.password = hash;
                });
            });

            await addDefaultCategories(user);

            Alert.alert("Success", "Signup Successful");
            navigation.replace("Login");
        } catch (error) {
            Alert.alert("Error", "Signup failed. Try again later");
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <View
            style={{
                flex: 1,
                padding: 24,
                justifyContent: "center",
            }}
        >
            <ThemedText style={{ fontSize: 32, fontWeight: "700", marginBottom: 12 }}>
                Create Account
            </ThemedText>

            <ThemedText style={{ color: "#666", marginBottom: 24 }}>
                Sign up to get started
            </ThemedText>

            <Input
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{ fontSize: 16, marginBottom: 16 }}
            />

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
                <Button loading={loading} title="Signup" onPress={handleSignup} />
            </View>

            <TouchableOpacity
                onPress={() => navigation.replace("Login")}
                style={{ marginTop: 16, alignItems: "center" }}
            >
                <Text style={{ color: "#666" }}>
                    Already have an account?{" "}
                    <Text style={{ color: colors?.secondary, fontWeight: "700" }}>
                        Login
                    </Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}
