import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import {
  Text,
  Card,
  Divider,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { agencyRepository } from "repository/agencyRepository";
import { useAuth } from "context/authContext";
import { alerts } from "utils";

function AgencyFlatList({ navigation }) {
  const { token } = useAuth();
  const theme = useTheme();
  const [agencies, setAgencies] = React.useState([]);
  const [isFecthing, setIsFetching] = React.useState(true);

  const fetchAgencies = React.useCallback(async () => {
    let result = await agencyRepository.getAgencies(token.token);
    let init = [];
    result.data.map((data, index) => {
      init.push({
        index: index,
        id: data.id,
        name: data.agency,
        description: data.description,
        path: `Agency ${index}`,
      });
    });

    setAgencies(init);
    setIsFetching(false);
  }, []);

  React.useEffect(() => {
    fetchAgencies().catch((error) => {
      alerts.error({ message: error.toString() });
    });
  }, [fetchAgencies]);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{ marginTop: 10, alignSelf: "center" }}
        variant="titleMedium"
      >
        Agency Partners
      </Text>
      <Text style={{ marginTop: 5, alignSelf: "center" }} variant="bodySmall">
        (Pull to refresh agency list)
      </Text>
      <Divider style={{ marginBottom: 5, marginTop: 15 }} />
      {isFecthing && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={70} />
        </View>
      )}
      {!isFecthing && agencies.length <= 0 && (
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25%",
          }}
        >
          <MaterialCommunityIcons
            name="database-search-outline"
            size={50}
            color="black"
            style={{ marginBottom: 10 }}
          />
          <Text variant="titleLarge" style={{ alignSelf: "center" }}>
            NO AGENCIES FOUND
          </Text>
          <Text variant="titleSmall" style={{ alignSelf: "center" }}>
            Pull to refresh
          </Text>
          <MaterialIcons name="arrow-downward" size={15} color="black" />
        </View>
      )}
      {!isFecthing && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isFecthing} onRefresh={fetchAgencies} />
          }
          contentContainerStyle={{ margin: 10, paddingBottom: 10 }}
          data={agencies}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Card
                key={`cardItem-${index}`}
                style={{ margin: 5, flexGrow: 1 }}
                onPress={() => navigation.navigate("Agency", item)}
              >
                <Card.Content
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name="groups"
                      size={30}
                      color={theme.colors.primary}
                    />
                    <View>
                      <Text variant="titleLarge" style={{ marginLeft: 15 }}>
                        {item.name}
                      </Text>
                      <Text variant="bodySmall" style={{ marginLeft: 15 }}>
                        (Tap to view options)
                      </Text>
                    </View>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={20} />
                </Card.Content>
              </Card>
            );
          }}
        />
      )}
    </View>
  );
}

export default AgencyFlatList;
