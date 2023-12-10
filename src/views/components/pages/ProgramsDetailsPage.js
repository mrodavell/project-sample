import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, Divider, Button } from 'react-native-paper';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';

function ProgramDetailsPage({ navigation, route }) {

    const config = route.params;
    const dateApplied = moment(config.data.created_at).format("MMM D, YYYY");
    let colorBe = config?.status.toLowerCase() === "pending" ? "red" : "blue";


    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <StatusBar style='dark' />
            <View style={{ flex: 1, marginTop: 20, padding: 10, }}>
                <Button style={{ alignSelf: 'flex-start' }} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left' size={24} />
                </Button>
                <FontAwesome5 name="users" size={50} color="black" style={{ alignSelf: 'center' }} />
                <Text variant="titleLarge" style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: 10 }}>{config.agency?.agency ?? "No Agency Defined"}</Text>
                <Divider style={{ marginVertical: 15 }} />
                <View>
                    <Text variant='bodyLarge' style={{ textAlign: config.agency?.description ? 'justify' : 'center', padding: 15 }}>
                        {config.agency?.description ?? "No Agency Description Defined"}
                    </Text>
                    <Text variant="titleMedium" style={{ alignSelf: 'center', marginTop: 10 }}>Date Applied: {dateApplied}</Text>
                    <Text variant="titleLarge" style={{ alignSelf: 'center', marginTop: 10 }}>Status: <Text style={{ color: colorBe }}>{config.status.toUpperCase()}</Text></Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProgramDetailsPage