import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';


export default function AccountRecoveredPage({ navigation }) {
    return (
        <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text variant='headlineLarge'>Recovery Complete!</Text>
            <Feather name="check-circle" size={100} color="green" style={{ marginTop: 20 }} />
            <Button
                onPress={() => navigation.navigate('Login')}
                mode='contained' icon="login"
                contentStyle={{ flexDirection: 'row-reverse' }}
                style={{ padding: 5, width: '100%', marginTop: 20 }}
                labelStyle={{ fontSize: 20 }}
            >
                Proceed to Login
            </Button>
        </View>
    )
}
