import React from "react";
import { FlatList, View } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "context/authContext";

function ProfileMenuFlatList({ navigation }) {
  const token = useAuth().token;
  const options = [
    {
      name: "Profile",
      subtitle: "Manage your basic profile",
      icon: "account",
      route: () => navigation.navigate("Profile Page"),
    },
    {
      name: "Address",
      subtitle: "Manage your address profile",
      icon: "home-map-marker",
      route: () => navigation.navigate("Address Page"),
    },
    {
      name: "Education",
      subtitle: "Manage your education background",
      icon: "school",
      route: () => navigation.navigate("Education Page"),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ margin: 10, paddingBottom: 10 }}
        data={options}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (index > 0 && token?.role == 2) {
            return null;
          }
          return (
            <Card
              key={`cardItem-${index}`}
              style={{ margin: 5, flexGrow: 1 }}
              onPress={() => item.route()}
            >
              <Card.Content
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons name={item.icon} size={30} />
                  <View>
                    <Text variant="titleLarge" style={{ marginLeft: 15 }}>
                      {item.name}
                    </Text>
                    <Text variant="bodySmall" style={{ marginLeft: 15 }}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} />
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
}

export default ProfileMenuFlatList;
