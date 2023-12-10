import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Divider, Text } from "react-native-paper";
import EditYouthALSForm from "../forms/EditYouthALSForm";

function YouthDetailsPage(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: "column", padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button compact onPress={() => navigation.popToTop()}>
            <MaterialCommunityIcons name="arrow-left" size={20} />
          </Button>
          <Text variant="headlineSmall">Youth Details</Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 10, marginBottom: 5 }} />
      <EditYouthALSForm {...props} />
    </View>
  );
}

export default YouthDetailsPage;
