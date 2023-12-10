import React, { useRef } from 'react';
import { View } from 'react-native';
import { alerts } from 'utils';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Divider, Text, TouchableRipple, useTheme } from 'react-native-paper';
import EditProfileForm from '../forms/EditProfileForm';

function ProfilePage({ navigation }) {

    const formRef = useRef();
    const theme = useTheme();
    const [isEdit, setIsEdit] = React.useState(false);

    const handleCancel = () => {
        if (formRef.current) {
            if (formRef.current.isValid) {
                setIsEdit(false);
            } else {
                alerts.error({ message: 'Please enter valid input' });
                setIsEdit(true);
            }
        }
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: 'column', padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button compact onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="arrow-left" size={20} />
                        </Button>
                        <Text variant='headlineMedium'>Profile</Text>
                    </View>
                    {!isEdit &&
                        <Button onPress={() => setIsEdit(!isEdit)}>
                            <Text style={{ color: theme.colors.primary }}>Edit</Text>
                            <AntDesign name="edit" size={20} />
                            {isEdit &&
                                <>
                                    <TouchableRipple>
                                        <Text style={{ color: 'red' }}>Cancel</Text>
                                        <AntDesign name="close" size={18} color='red' />s
                                    </TouchableRipple>

                                </>
                            }
                        </Button>
                    }
                    {isEdit &&
                        <Button onPress={() => handleCancel()}>
                            <Text style={{ color: 'red' }}>Cancel</Text>
                            <AntDesign name="close" size={18} color='red' />
                        </Button>
                    }
                </View>
            </View>
            <Divider />
            <EditProfileForm isEdit={isEdit} setIsEdit={setIsEdit} formRef={formRef} />
        </View>
    )
}

export default ProfilePage