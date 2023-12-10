import React from 'react'
import { SafeAreaView, Image, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, useTheme } from 'react-native-paper';
import { LoginForm } from '@components';

function LoginScreen(props) {
    const { navigation } = props;
    const theme = useTheme();
    const year = new Date().getFullYear();

    const handleNavigation = (path) => {
        navigation.navigate(path);
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: theme.colors.primary }}>
            <StatusBar style='light' />
            <View style={{ flex: 1, padding: 50, paddingBottom: 0 }}>
                <Image source={require('../../../../assets/logo.png')} style={{ alignSelf: 'center' }} />
                <Text style={{ color: theme.colors.onPrimary, alignSelf: 'flex-end' }}>Version 1.0</Text>
            </View>
            <View style={{ flex: 5, justifyContent: 'space-between', padding: 30, paddingTop: 50, backgroundColor: theme.colors.onPrimary, borderTopRightRadius: 50, borderTopLeftRadius: 50 }}>
                <View>
                    <LoginForm navigation={navigation} />
                    <Button
                        style={{ marginTop: 10, padding: 7 }}
                        onPress={() => handleNavigation("Registration")}
                        icon="account-plus"
                        mode="contained"
                        uppercase
                    >
                        Sign-up
                    </Button>
                    <Text variant='bodyLarge' style={{ alignSelf: 'center', marginTop: 30 }}>Forgot Password ?</Text>
                    <Button
                        mode='contained-tonal'
                        style={{ marginTop: 15, width: 200, alignSelf: 'center', color: theme.colors.onPrimary }}
                        compact onPress={() => handleNavigation("Account Recovery")}
                        labelStyle={{ marginLeft: 15 }} >
                        <Text variant='titleMedium' style={{ color: theme.colors.primary }}>Recover Account</Text>
                    </Button>
                </View>
                <View>
                    <Button mode='text' style={{ marginTop: 15, width: 200, alignSelf: 'center' }} compact onPress={() => handleNavigation("Privacy Statement")} labelStyle={{ marginLeft: 15 }} >
                        <Text variant='titleMedium' style={{ color: 'grey' }}>Privacy Statement</Text>
                    </Button>
                    <Text variant='titleSmall' style={{ color: 'grey', alignSelf: 'center' }}>{'\u00A9'} {year}. All Rights Reserved.</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen