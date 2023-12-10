import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Pages   
import AgencyScreen from '../views/screens/Agency';
import { HomePage, DepEdALSPage, CSWDPage, PESOPage, PYAPPage, HEIPage, JobsPage, MyJobsPage, JobDetailsPage, MyProgramsPage, ProgramDetailsPage } from 'views/components/pages';

function HomeNavigationStack() {
    return (
        <NavigationContainer independent>
            <Stack.Navigator initialRouteName={"Home"}>
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomePage} />
                <Stack.Screen options={{ headerShown: false }} name="Jobs" component={JobsPage} />
                <Stack.Screen options={{ headerShown: false }} name="My Programs" component={MyProgramsPage} />
                <Stack.Screen options={{ headerShown: false }} name="Program Details" component={ProgramDetailsPage} />
                <Stack.Screen options={{ headerShown: false }} name="My Jobs" component={MyJobsPage} />
                <Stack.Screen options={{ headerShown: false }} name="Job Details" component={JobDetailsPage} />
                <Stack.Screen options={{ headerShown: false }} name="Agency" component={AgencyScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Agency 0" component={CSWDPage} />
                <Stack.Screen options={{ headerShown: false }} name="Agency 1" component={DepEdALSPage} />
                <Stack.Screen options={{ headerShown: false }} name="Agency 2" component={HEIPage} />
                <Stack.Screen options={{ headerShown: false }} name="Agency 3" component={PESOPage} />
                <Stack.Screen options={{ headerShown: false }} name="Agency 4" component={PYAPPage} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default HomeNavigationStack