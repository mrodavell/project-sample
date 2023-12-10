import React from 'react';
import { Button, Card, Divider, Text, useTheme } from 'react-native-paper';
import { useAuth } from 'context/authContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useHomePage } from 'context/homepageContext';

function NameCard() {

    const { me } = useAuth();
    const theme = useTheme();
    const { setIndex } = useHomePage();
    const mainColor = theme.colors.primary;

    return (
        <Card elevation={5}>
            <Card.Content>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }} >
                        <MaterialCommunityIcons name="robot" size={22} style={{ marginRight: 5 }} />
                        <Text variant='titleLarge'>Welcome!</Text>
                    </View>
                    {/* <Button mode='text' compact>
                        <MaterialCommunityIcons name="bell-outline" size={22} />
                    </Button> */}
                </View>
                <Divider style={{ marginBottom: 10 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <MaterialCommunityIcons name='account' size={24} style={{ marginRight: 5 }} color={mainColor} />
                        <Text variant='titleLarge' style={{ color: mainColor }}>
                            {me?.first_name} {me?.last_name}
                        </Text>
                    </View>
                    <Button mode='text' compact onPress={() => setIndex(1)}>
                        <MaterialCommunityIcons name="pencil" size={22} />
                    </Button>
                </View>
            </Card.Content>
            <Card.Actions>

            </Card.Actions>
        </Card>
    )
}

export default NameCard