import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme, Text, Divider } from 'react-native-paper';
import ProfileMenuFlatList from 'views/components/list/ProfileMenuFlatList';

function ProfileScreen({ navigation }) {

    const theme = useTheme()

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <StatusBar style='dark' />
            <View style={{ flex: 1, marginTop: 20, padding: 10 }}>
                <FontAwesome5 name="user-alt" size={100} color="black" style={{ alignSelf: 'center', color: theme.colors.primary }} />
                <Text variant="titleLarge" style={{ alignSelf: 'center', fontWeight: 'bold' }}>User Profile</Text>
                <Divider style={{ marginVertical: 10 }} />
                <ProfileMenuFlatList navigation={navigation} />
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen