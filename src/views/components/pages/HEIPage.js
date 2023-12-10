import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Divider, Text } from 'react-native-paper';
import HEIForm from '../forms/HEIForm';

function HEIPage(props) {

    const { navigation } = props;

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'column', padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button compact onPress={() => navigation.popToTop()}>
                            <MaterialCommunityIcons name="arrow-left" size={20} />
                        </Button>
                        <Text variant='headlineSmall'>HEI Information Details</Text>
                    </View>
                </View>
            </View>
            <Divider style={{ marginVertical: 10, marginBottom: 5 }} />
            <HEIForm {...props} />
        </View>
    )
}

export default HEIPage