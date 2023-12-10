import Swipeable from "@mrodavell/react-native-swipeable";
import { View, TouchableHighlight } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export default function SwipeableCard({ item, index, options }) {
  const theme = useTheme();
  const { handleEditYouth, handleDeleteYouth, handleUploadYouth } = options;
  const rightButtons = (item) => {
    const paddingLeft = item.sync === "0" ? 20 : 10;
    const marginLeft = item.sync === "0" ? 0 : 15;

    const withEdit =
      item.sync === "0" ? (
        <TouchableHighlight
          style={{
            backgroundColor: theme.colors.primary,
            marginTop: 5,
            justifyContent: "center",
            paddingLeft: 25,
            height: 70,
          }}
          onPress={() => handleEditYouth(item.id)}
        >
          <>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={30}
              color="#FFF"
            />
            <Text style={{ color: "#FFF" }}>Edit</Text>
          </>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          style={{
            backgroundColor: theme.colors.success,
            marginTop: 5,
            justifyContent: "center",
            paddingLeft: 20,
            height: 70,
          }}
          onPress={() => handleEditYouth(item.id, false)}
        >
          <>
            <MaterialCommunityIcons
              style={{ marginLeft: 3 }}
              name="account"
              size={30}
              color="#FFF"
            />
            <Text style={{ color: "#FFF" }}>Details</Text>
          </>
        </TouchableHighlight>
      );
    return [
      <TouchableHighlight
        disabled={item.sync === "0" ? false : true}
        style={{
          backgroundColor: item.sync === "0" ? theme.colors.success : "#CCC",
          marginTop: 5,
          justifyContent: "center",
          paddingLeft: paddingLeft,
          height: 70,
        }}
        onPress={() => handleUploadYouth(item)}
      >
        <>
          <MaterialCommunityIcons
            name={item.sync === "0" ? "upload" : "check"}
            size={30}
            color="#FFF"
            style={{ marginLeft: marginLeft }}
          />
          <Text style={{ color: "#FFF" }}>
            {item.sync === "0" ? "Upload" : "Uploaded"}
          </Text>
        </>
      </TouchableHighlight>,
      withEdit,
      <TouchableHighlight
        style={{
          backgroundColor: theme.colors.error,
          marginTop: 5,
          justifyContent: "center",
          paddingLeft: 20,
          height: 70,
        }}
        onPress={() => handleDeleteYouth(item.id)}
      >
        <>
          <MaterialCommunityIcons name="trash-can" size={30} color="#FFF" />
          <Text style={{ color: "#FFF" }}>Delete</Text>
        </>
      </TouchableHighlight>,
    ];
  };

  return (
    <Swipeable key={`cardItem-${index}`} rightButtons={rightButtons(item)}>
      <Card style={{ margin: 5, flexGrow: 1 }}>
        <Card.Content
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name={item.sync === "0" ? "account-sync" : "account-check"}
              size={30}
              color={
                item.sync === "0" ? theme.colors.primary : theme.colors.success
              }
            />
            <View>
              <Text variant="titleLarge" style={{ marginLeft: 15 }}>
                {item.name}
              </Text>
              <Text variant="bodySmall" style={{ marginLeft: 15 }}>
                (Swipe left to view options)
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-left" size={20} />
        </Card.Content>
      </Card>
    </Swipeable>
  );
}
