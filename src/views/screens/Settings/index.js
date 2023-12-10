import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme, Text, Divider } from 'react-native-paper';
import SettingsMenuFlatList from 'views/components/list/SettingsMenuFlatList';

function SettingsScreen({ navigation }) {

    const theme = useTheme()

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <StatusBar style='dark' />
            <View style={{ flex: 1, marginTop: 20, padding: 10 }}>
                <FontAwesome5 name="user-cog" size={90} color="black" style={{ alignSelf: 'center', color: theme.colors.primary }} />
                <Text variant="titleLarge" style={{ alignSelf: 'center', fontWeight: 'bold' }}>User Settings</Text>
                <Divider style={{ marginVertical: 10 }} />
                <SettingsMenuFlatList navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen