import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';
import { Appbar, BottomNavigation, useTheme, Text, TouchableRipple } from 'react-native-paper';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { secureStorage, storage } from 'utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomePageProviders from 'context/providers/HomePageProvider';
import FacilitatorNavigationStack from 'navigation/FacilitatorNavigationStack';
import ProfileNavigationStack from 'navigation/ProfileNavigationStack';
import SettingsNavigationStack from 'navigation/SettingsNavigationStack';

function FacilitatorScreen({ navigation }) {

    const theme = useTheme();
    const { top, bottom } = useSafeAreaInsets();

    const mainColor = theme.colors.primary;
    const subColor = theme.colors.onPrimary;

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
        { key: 'settings', title: 'Settings', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' }
    ])

    const renderScene = BottomNavigation.SceneMap({
        home: FacilitatorNavigationStack,
        profile: ProfileNavigationStack,
        settings: SettingsNavigationStack
    })

    const handleLogout = () => {
        secureStorage.removeItem("_token");
        storage.clear();
        navigation.navigate("Login");
    }

    return (
        <HomePageProviders value={{ index, setIndex }}>
            <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
                <StatusBar style='dark' />
                <Appbar.Header safeAreaInsets={top} statusBarHeight={0} mode="small" style={{ backgroundColor: mainColor }}>
                    <Image source={require('@assets/icon.png')} style={{ width: 50, height: 50, borderRadius: 20, marginRight: 5 }} />
                    <Appbar.Content titleStyle={{ color: subColor }} title="Monitor" />
                    <TouchableRipple onPress={handleLogout}>
                        <View style={{ flexDirection: "row" }}>
                            <Text variant='titleMedium' style={{ color: subColor, marginRight: 5 }}>Exit</Text>
                            <MaterialCommunityIcons name="logout" color={subColor} size={20} style={{ marginRight: 5 }} />
                        </View>
                    </TouchableRipple>
                </Appbar.Header>
                <BottomNavigation
                    safeAreaInsets={bottom}
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            </SafeAreaView>
        </HomePageProviders>
    )
}

export default FacilitatorScreen