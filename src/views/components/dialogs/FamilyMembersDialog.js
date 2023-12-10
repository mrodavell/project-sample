import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Dialog, Portal } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FamilyMembersForm from '../forms/FamilyMembersForm';

export default function FamilyMembersDialog(props) {
    return (
        <View>
            <Portal>
                <Dialog visible={props.show} style={{ borderRadius: 5, backgroundColor: "white" }}>
                    <Dialog.Title>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='account-plus' size={20} />
                            <Text variant='titleMedium' style={{ marginLeft: 10 }}>
                                Add New Family Member
                            </Text>
                        </View>
                    </Dialog.Title>
                    <Dialog.Content>
                        <ScrollView style={{ height: 400 }}>
                            <FamilyMembersForm add={(data) => props.add(data)} cancel={props.cancel} />
                        </ScrollView>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    )
}
