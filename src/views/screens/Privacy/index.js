import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

function PrivacyScreen() {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: "#FFF" }}>
            <ScrollView style={{ padding: 20 }}>
                <View>
                    <Text variant='bodyLarge' style={{ textAlign: "justify" }}>
                        The eMonitorMo research team of <Text style={{ fontWeight: 'bold' }}>University of Science and Technology of Southern Philippines
                            {" (USTP)"}</Text> and the <Text style={{ fontWeight: 'bold' }}>Local Government Unit of Cagayan de Oro</Text> and their identified partners
                        recognize their responsibilities under the <Text style={{ fontWeight: 'bold' }}>Republic Act No. 10173 (Act)</Text>, also known as the
                        <Text style={{ fontWeight: 'bold' }}> Data Privacy Act of 2012</Text>, with respect to the data they collect, record, organize, update, use,
                        consolidate or destruct from the out-of-school youth and other pertinent users of the application.
                        The personal data obtained from this application is entered and stored within the {"system\’s"} server and will only be
                        accessed by the eMonitorMo research team and other identified personnel from the partner agencies.
                    </Text>
                </View>
                <View>
                    <Text variant='bodyLarge' style={{ textAlign: "justify", marginTop: 10 }}>
                        Furthermore, the information collected and stored in the {"system\’s"} database shall only be used for
                        the following purposes:
                        <Text>
                            Processing and reporting of documents as requested by authorities with respect to certain conditions
                            as required by law. Activities and undertakings pertaining to establishing relations with partners for
                            the benefit and development of the system. The eMonitorMo team and other pertinent users of the
                            application shall not disclose the {"user\’s"} personal information without their consent and shall retain this
                            information over a period of ten years for the effective implementation and management of fundraising campaigns.
                        </Text>
                    </Text>
                </View>
                <View>
                    <Text variant='bodyLarge' style={{ textAlign: "justify", marginTop: 20 }}>
                        <Text variant='titleMedium' style={{ fontWeight: "bold" }}>USER CONSENT: {"\n"}</Text>
                        <Text>
                            I have read the {"Institute\’s"} Data Privacy Statement and expressed my consent for the eMonitorMo
                            research team of University of Science and Technology of Southern Philippines {"(USTP)"} and the Local
                            Government Unit of Cagayan de Oro and their identified partners to <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>collect</Text>,
                            <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}> record</Text>, <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>organize</Text>, <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>update or modify</Text>, <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>retrieve</Text>,
                            <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}> consult</Text>, <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>use</Text>, <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>consolidate</Text>, <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>block</Text>,
                            <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}> erase</Text> or <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>desctruct</Text> my personal data as part of my information.
                        </Text>
                    </Text>
                </View>
                <View>
                    <Text variant='bodyLarge' style={{ textAlign: "justify", marginTop: 10, marginBottom: 50 }}>
                        I hereby affirm my right to be <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>informed</Text>, <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>object to processing</Text>,
                        <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}> access</Text> and <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>rectify</Text>, <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>suspend</Text> or <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>withdraw</Text> my
                        personal data, and be indemnified in case of damages pursuant to the provisions of the
                        Republic Act No. 10173 of the Philippines, Data Privacy Act of 2012 and its corresponding
                        Implementing Rules and Regulations.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PrivacyScreen