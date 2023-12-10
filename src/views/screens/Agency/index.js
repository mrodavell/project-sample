import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, Divider, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { agencyRepository } from 'repository/agencyRepository';
import { useAuth } from 'context/authContext';
import { alerts } from 'utils';

function AgencyScreen({ navigation, route }) {

    const theme = useTheme();
    const config = route.params;
    const { token } = useAuth();
    const [isChecking, setIsChecking] = React.useState(false);

    const handleApply = async () => {
        try {
            if (config.name === "PESO") {
                navigation.navigate("Jobs");
                return null;
            }
            setIsChecking(true);
            let result = await agencyRepository.checkApplyAgency(token.token, { "agency_id": config.id.toString() });

            if (!result.error) {
                if (result.data.status === "pending") {
                    alerts.info({ message: "You have a pending application" });
                } else {
                    navigation.navigate(`Agency ${config.index}`, { agency_id: config.id });
                }
            } else {
                alerts.error({ message: result.message });
            }
        } catch (error) {
            alerts.error({ message: error.toString() });
        } finally {
            setIsChecking(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <StatusBar style='dark' />
            <View style={{ flex: 1, marginTop: 20, padding: 10, }}>
                <Button style={{ alignSelf: 'flex-start' }} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name='arrow-left' size={24} />
                </Button>
                <Octicons name="organization" size={50} color="black" style={{ alignSelf: 'center' }} />
                <Text variant="titleLarge" style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: 10 }}>{config.name}</Text>
                <Divider style={{ marginVertical: 15 }} />
                <Text variant='bodyLarge' style={{ textAlign: 'justify', padding: 15 }}>
                    {config.description}
                </Text>
                <Divider style={{ marginVertical: 15 }} />
                <Text style={{ alignSelf: 'center' }} variant='bodyLarge'>To avail on this agency's services just tap apply.</Text>
                <Button
                    icon={config.name === "PESO" ? "briefcase" : "check"}
                    mode='contained'
                    style={{ marginTop: 15, padding: 5 }}
                    contentStyle={{ flexDirection: 'row-reverse' }}
                    onPress={() => handleApply()}
                    loading={isChecking}
                >
                    <Text variant='titleMedium' style={{ color: theme.colors.onPrimary }}>
                        {isChecking ? "Checking..." : config.name === "PESO" ? "View Jobs" : "Apply"}
                    </Text>
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default AgencyScreen