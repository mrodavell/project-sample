import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Pages
import ProfileScreen from "../views/screens/Profile";
import {
  ProfilePage,
  AddressPage,
  EducationBackgroundPage,
} from "views/components/pages";

function ProfileNavigationStack() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName={"Profile"}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile Page"
          component={ProfilePage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Address Page"
          component={AddressPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Education Page"
          component={EducationBackgroundPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ProfileNavigationStack;
