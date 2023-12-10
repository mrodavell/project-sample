
import React from 'react';
import { View } from 'react-native';
import { Text, Dialog, Portal } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DependentsForm from '../forms/DependentsForm';

export default function DependentsDialog(props) {
    return (
        <View>
            <Portal>
                <Dialog visible={props.show} style={{ borderRadius: 5, backgroundColor: "white" }}>
                    <Dialog.Title>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='account-plus' size={20} />
                            <Text variant='titleMedium' style={{ marginLeft: 10 }}>
                                Add New Dependents
                            </Text>
                        </View>
                    </Dialog.Title>
                    <Dialog.Content>
                        <DependentsForm add={(data) => props.add(data)} cancel={props.cancel} />
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    )
}
