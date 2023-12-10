import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import {
  FacilitatorHomePage,
  AddYouthPage,
  EditYouthPage,
  YouthDetailsPage,
} from "views/components/pages";

function FacilitatorNavigationStack() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName={"Home"}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={FacilitatorHomePage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddYouth"
          component={AddYouthPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditYouth"
          component={EditYouthPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="YouthDetails"
          component={YouthDetailsPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default FacilitatorNavigationStack;
