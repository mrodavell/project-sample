import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import { useAuth } from "context/authContext";

const Stack = createNativeStackNavigator();

// Screens
import {
  LoginScreen,
  RegisterScreen,
  AccountRecoveryScreen,
  PrivacyScreen,
  OnboardingScreen,
  HomeScreen,
  FacilitatorScreen,
} from "@screens";

function NavigationStack() {
  const token = useAuth().token; 
  const initRoute =
    !token || token === undefined
      ? "Login"
      : token?.role === 3
      ? "Home"
      : "Facilitator";
  const theme = useTheme();

  const headerOptions = {
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.colors.onPrimary,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initRoute}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ ...headerOptions }}
          name="Registration"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ ...headerOptions }}
          name="Account Recovery"
          component={AccountRecoveryScreen}
        />
        <Stack.Screen
          options={{ ...headerOptions }}
          name="Privacy Statement"
          component={PrivacyScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Onboarding"
          component={OnboardingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Facilitator"
          component={FacilitatorScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationStack;
