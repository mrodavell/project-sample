
import React from 'react';
import { View } from 'react-native';
import { Text, Dialog, Portal } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkExperienceForm from '../forms/WorkExperienceForm';

export default function WorkExperienceDialog(props) {
    return (
        <View>
            <Portal>
                <Dialog visible={props.show} style={{ borderRadius: 5, backgroundColor: "white" }}>
                    <Dialog.Title>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name='briefcase-plus' size={20} />
                            <Text variant='titleMedium' style={{ marginLeft: 10 }}>
                                Add New Work Experience
                            </Text>
                        </View>
                    </Dialog.Title>
                    <Dialog.Content>
                        <WorkExperienceForm add={(data) => props.add(data)} cancel={props.cancel} />
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    )
}
