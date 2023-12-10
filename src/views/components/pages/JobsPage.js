import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image } from 'react-native';
import { Divider, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import JobsList from '../list/JobsList';
import PESOLOGO from '@assets/agencies/peso.png';

export default function JobsPage() {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button compact onPress={() => navigation.popToTop()} style={{ alignSelf: 'flex-start' }}>
                        <MaterialCommunityIcons name="arrow-left" size={20} />
                    </Button>
                    <Image source={PESOLOGO} style={{ width: 30, height: 30 }} />
                    <Text variant='titleLarge' style={{ marginLeft: 5 }}>PESO Jobs Posted</Text>
                </View>
            </View>
            <Divider style={{ marginTop: 10 }} />
            <JobsList />
        </View>
    )
}
