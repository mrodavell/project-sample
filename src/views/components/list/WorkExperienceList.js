import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

function WorkExperienceList(props) {

    const handleRemove = (index) => {
        let prevState = [...props.workExperience];
        prevState.splice(index, 1);
        if (props.setWorkExperience) {
            props.setWorkExperience(prevState);
        }
    }

    return (
        <View style={{ flex: 1, marginTop: 5 }}>
            {props?.workExperience.length === 0 &&
                <View style={{ flexGrow: 1, padding: 20, marginBottom: 10, justifyContent: 'center', alignItems: "center", borderStyle: 'dashed', borderColor: 'gray', borderWidth: 2 }}>
                    <Text>No Work Experience Added</Text>
                </View>
            }
            {props?.workExperience.length > 0 &&
                <ScrollView>
                    {
                        props?.workExperience?.map((item, index) => {
                            return <Card key={`cardItem-${index}`} style={{ margin: 1, flexGrow: 1 }}>
                                <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <MaterialCommunityIcons name="account" size={24} />
                                            <View>
                                                <Text variant='titleMedium' style={{ marginLeft: 15 }}>Position: {item.position} ({item.year_employed})</Text>
                                                <Text variant='titleSmall' style={{ marginLeft: 15 }}>Company: {item.company}</Text>
                                            </View>
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

export default WorkExperienceList