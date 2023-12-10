import React from "react";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useYouthStore } from "zustand/useYouthStore";

function YouthTraced({ options }) {
  const theme = useTheme();
  const mainColor = theme.colors.primary;
  const youths = useYouthStore((state) => state.youths);
  const { fetchYouths } = options;
  return (
    <Card elevation={5}>
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              style={{ marginRight: 5 }}
              color={mainColor}
            />
            <Text variant="titleLarge" style={{ color: mainColor }}>
              Youth Traced: {youths.length}
            </Text>
          </View>
          <Button mode="text" compact onPress={() => fetchYouths()}>
            <MaterialCommunityIcons name="sync" size={22} />
          </Button>
        </View>
      </Card.Content> 
    </Card>
  );
}

export default YouthTraced;
