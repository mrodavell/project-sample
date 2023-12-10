import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Select(props) {
    return (
        <View>
            <TextInput
                placeholder={props.placeholder ?? 'Select data'}
            />
        </View>
    )
}
