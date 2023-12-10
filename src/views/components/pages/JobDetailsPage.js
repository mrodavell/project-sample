import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, Divider, Button, useTheme } from 'react-native-paper';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { agencyRepository } from 'repository/agencyRepository';
import { useAuth } from 'context/authContext';
import { alerts } from 'utils';

function JobDetailsPage({ navigation, route }) {

    const theme = useTheme();
    const config = route.params;
    const { token } = useAuth();
    const [isApplying, setIsApplying] = React.useState(false);

    const handleApply = async () => {
        try {
            setIsApplying(true);

            let result = await agencyRepository.applyForJob(token.token, { "job_id": config.id.toString() });

            if (!result.error) {
                if (result.data.status === "pending") {
                    alerts.info({ message: "You have a pending application" });
                } else {
                    alerts.success({ message: result.message });
                }
            } else {
                alerts.error({ message: result.message });
            }
        } catch (error) {
            alerts.error({ message: error.toString() });
        } finally {
            setIsApplying(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <StatusBar style='dark' />
            <View style={{ flex: 1, marginTop: 20, padding: 10, }}>
                <Button style={{ alignSelf: 'flex-start' }} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left' size={24} />
                </Button>
                <FontAwesome5 name="briefcase" size={50} color="black" style={{ alignSelf: 'center' }} />
                <Text variant="titleLarge" style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: 10 }}>{config.name}</Text>
                <View style={{ flexDirection: "row", alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Octicons name='organization' size={24} />
                    <Text variant="titleMedium" style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: 10, marginLeft: 5 }}>{config.data.company}</Text>
                </View>
                <Divider style={{ marginVertical: 15 }} />
                <Text variant='bodyLarge' style={{ textAlign: 'justify', padding: 15 }}>
                    {config.description}
                </Text>
                {!config.isMyJob &&
                    <>
                        <Divider style={{ marginVertical: 15 }} />
                        <Text style={{ alignSelf: 'center' }} variant='bodyLarge'>Tap on apply button to apply for the position.</Text>

                        <Button
                            icon="check"
                            mode='contained'
                            style={{ marginTop: 15, padding: 5 }}
                            contentStyle={{ flexDirection: 'row-reverse' }}
                            onPress={() => handleApply()}
                            loading={isApplying}
                        >
                            <Text variant='titleMedium' style={{ color: theme.colors.onPrimary }}>
                                {isApplying ? "Applying..." : "Apply"}
                            </Text>
                        </Button>
                    </>
                }

            </View>
        </SafeAreaView>
    )
}

export default JobDetailsPage