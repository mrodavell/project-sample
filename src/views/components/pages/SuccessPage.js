import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';


export default function SuccessPage({ navigation, message, path, btnTitle, icon }) {
    return (
        <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text variant='titleLarge'>{message}</Text>
            <Feather name="check-circle" size={100} color="green" style={{ marginTop: 20 }} />
            {
                navigation &&
                <Button
                    onPress={() => navigation.navigate(path)}
                    mode='contained' icon={icon}
                    contentStyle={{ flexDirection: 'row-reverse' }}
                    style={{ padding: 5, width: '100%', marginTop: 20 }}
                    labelStyle={{ fontSize: 20 }}
                >
                    {btnTitle}
                </Button>
            }

        </View>
    )
}
