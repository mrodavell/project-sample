import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

function FamilyMemberList(props) {

    const handleRemove = (index) => {
        let prevState = [...props.family];
        prevState.splice(index, 1);
        if (props.setFamily) {
            props.setFamily(prevState);
        }
    }

    return (
        <View style={{ flex: 1, marginTop: 5 }}>
            {props?.family.length === 0 &&
                <View style={{ flexGrow: 1, padding: 20, marginBottom: 10, justifyContent: 'center', alignItems: "center", borderStyle: 'dashed', borderColor: 'gray', borderWidth: 2 }}>
                    <Text>No Family Members Added</Text>
                </View>
            }
            {props?.family.length > 0 &&
                <ScrollView>
                    {
                        props?.family?.map((item, index) => {
                            return <Card key={`cardItem-${index}`} style={{ margin: 1, flexGrow: 1 }}>
                                <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <MaterialCommunityIcons name="account" size={24} />
                                            <Text variant='titleMedium' style={{ marginLeft: 15 }}>{item.name} ({item.relationship})</Text>
                                        </View>
                                        <Button style={{ alignSelf: 'flex-end' }} onPress={() => handleRemove(index)}>
                                            <FontAwesome5 name='times' size={24} color="red" />
                                        </Button>
                                    </View>
                                </Card.Content>
                            </Card>
                        })
                    }
                </ScrollView>
            }

        </View>
    )
}

export default FamilyMemberList