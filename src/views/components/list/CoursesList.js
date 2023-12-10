import React from 'react';
import { View } from 'react-native';
import { Text, useTheme, Divider, Card } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { alerts } from 'utils';

function CoursesList(props) {

    const theme = useTheme();
    const selectedList = props.courseSelected;

    const courses = [
        "Carpentry NCII",
        "Electrical Installation & Maintenance NCII",
        "Construction Painting NCII",
        "Plumbing NCI",
        "Plumbing NCII",
        "Shielded Metal Arc and Welding NC I",
        "Shielded Metal Arc and Welding NC II",
        "Housekeeping NCII"
    ]

    const handleUpdate = (item) => {

        if (selectedList.length === 3) {
            alerts.info({ message: "Maxium of 3 courses only" });
            return null;
        }

        let isSelected = selectedList.includes(item);
        if (!isSelected) {
            selectedList.push(item);
            props.handleUpdate(selectedList);
        } else {
            let index = selectedList.indexOf(item);
            selectedList.splice(index, 1);
            props.handleUpdate(selectedList);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <MaterialCommunityIcons name='clipboard-plus' size={20} />
                <View>
                    <Text variant='titleLarge' style={{ marginLeft: 10 }}>
                        Course List
                    </Text>
                </View>
            </View>
            <View style={{ marginLeft: 10 }}>
                <Text variant='titleSmall'>
                    Note:
                </Text>
                <Text>
                    * Pick the course you are most interested to least
                </Text>
                <Text>
                    * Pick atleast 1 course
                </Text>
                <Text>
                    * Maximum of 3 courses only
                </Text>
                <Divider style={{ marginVertical: 5 }} />
            </View>
            {
                courses.map((item, index) => {
                    let isSelected = selectedList.includes(item);
                    return (
                        <Card key={`cardItem-${index}`} style={{ margin: 5, flexGrow: 1 }} onPress={() => handleUpdate(item)}>
                            <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialIcons name="school" size={30} color={theme.colors.primary} />
                                    <View>
                                        <Text variant='titleSmall' style={{ marginLeft: 15 }}>{item}</Text>
                                        <Text variant='bodySmall' style={{ marginLeft: 15 }}>(Tap to select or unselect)</Text>
                                    </View>
                                </View>
                                {isSelected &&
                                    <MaterialCommunityIcons name="check" color="green" size={20} />
                                }
                            </Card.Content>
                        </Card>
                    )
                })
            }
        </View>
    )
}

export default CoursesList