import React, { useRef } from 'react';
import { View } from 'react-native';
import { alerts } from 'utils';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Divider, Text, TouchableRipple, useTheme } from 'react-native-paper';
import ChangePasswordForm from '../forms/ChangePasswordForm';

function ChangePasswordPage({ navigation }) {

    const formRef = useRef();
    const theme = useTheme();

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'column', padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button compact onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="arrow-left" size={20} />
                        </Button>
                        <Text variant='headlineSmall'>Change Password</Text>
                    </View>
                </View>
            </View>
            <Divider />
            <ChangePasswordForm />
        </View>
    )
}

export default ChangePasswordPage