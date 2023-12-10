import React from 'react';
import { View } from 'react-native';
import { Divider, Text, Button, useTheme } from 'react-native-paper';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MyProgramsList from '../list/MyProgramsList';

export default function MyProgramsPage() {

    const navigation = useNavigation();
    const theme = useTheme();

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button compact onPress={() => navigation.popToTop()} style={{ alignSelf: 'flex-start' }}>
                        <MaterialCommunityIcons name="arrow-left" size={20} />
                    </Button>
                    <FontAwesome5 name="users" size={25} color={theme.colors.primary} />
                    <Text variant='titleLarge' style={{ marginLeft: 5 }}>Programs Applied</Text>
                </View>
            </View>
            <Divider style={{ marginTop: 10 }} />
            <MyProgramsList />
        </View>
    )
}
