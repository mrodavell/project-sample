import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Pages  
import SettingsScreen from '../views/screens/Settings'
import { ChangePasswordPage, ChangeEmailPage } from 'views/components/pages';

function SettingsNavigationStack() {
    return (
        <NavigationContainer independent>
            <Stack.Navigator initialRouteName={"Settings"}>
                <Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Change Email" component={ChangeEmailPage} />
                <Stack.Screen options={{ headerShown: false }} name="Change Password" component={ChangePasswordPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default SettingsNavigationStack