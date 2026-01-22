import React, { useState, useMemo, useEffect } from 'react';
import { DarkTheme, NavigationContainer, DefaultTheme, useTheme } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { AuthContext } from './AuthContext';
import { Appearance, Platform, StatusBar, useColorScheme } from 'react-native';

import { darkTheme as CustomDarkTheme, lightTheme as CustomLightTheme } from '../utils/theme';
import User from '../database/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ThemeObserver = () => {
  const theme = useTheme();
  const systemScheme = useColorScheme();

  useEffect(() => {
    console.log({
      navigationTheme: theme.dark ? 'dark' : 'light',
      systemTheme: systemScheme,
    });
  }, [theme.dark, systemScheme]);

  return null;
}


const RootNavigator = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const scheme = useColorScheme();
  const authContext = useMemo(
    () => ({
      user,
      signIn: async (userData: User) => {
        setUser(userData);
        await AsyncStorage.setItem("USER", JSON.stringify(userData));
      },
      signOut: async () => {
        setUser(null);
        await AsyncStorage.removeItem("USER");
      },
    }),
    [user]
  );

  useEffect(() => {
    const restoreUser = async () => {
      const storedUser = await AsyncStorage.getItem("USER");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    restoreUser();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={scheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
        <ThemeObserver />
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default RootNavigator;
