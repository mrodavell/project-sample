import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Divider, Text } from 'react-native-paper';
import PYAPForm from '../forms/PYAPForm';

function PYAPPage(props) {

    const { navigation } = props;

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'column', padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button compact onPress={() => navigation.popToTop()}>
                            <MaterialCommunityIcons name="arrow-left" size={20} />
                        </Button>
                        <Text variant='headlineSmall'>PYAP Information Details</Text>
                    </View>
                </View>
            </View>
            <Divider style={{ marginVertical: 10, marginBottom: 5 }} />
            <PYAPForm {...props} />
        </View>
    )
}

export default PYAPPage