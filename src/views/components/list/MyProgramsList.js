import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Text, Card, useTheme, ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { agencyRepository } from "repository/agencyRepository";
import { useAuth } from "context/authContext";
import { alerts } from "utils";
import { useNavigation } from "@react-navigation/native";

function MyProgramsList() {
  const { token } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();
  const [myPrograms, setMyPrograms] = React.useState([]);
  const [isFecthing, setIsFetching] = React.useState(true);

  const fetchMyPrograms = React.useCallback(async () => {
    let init = [];

    try {
      let result = await agencyRepository.getMyPrograms(token.token);
      if (!result.error) {
        result.data.map((data, index) => {
          init.push({
            index: index,
            id: data.id,
            agency: data.agency,
            status: data.status,
            data: data,
          });
        });
      } else {
        alerts.error({ message: result.message });
      }
    } catch (error) {
      alerts.error({ message: error.toString() });
    } finally {
      setMyPrograms(init);
      setIsFetching(false);
    }
  }, []);

  React.useEffect(() => {
    fetchMyPrograms().catch((error) => {
      alerts.error({ message: error.toString() });
    });
  }, [fetchMyPrograms]);

  return (
    <View style={{ flex: 1, marginTop: 5 }}>
      {isFecthing && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={70} />
        </View>
      )}
      {!isFecthing && myPrograms.length <= 0 && (
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15%",
          }}
        >
          <MaterialCommunityIcons
            name="database-search-outline"
            size={50}
            color="black"
            style={{ marginBottom: 10 }}
          />
          <Text variant="titleLarge" style={{ alignSelf: "center" }}>
            NO PROGRAMS FOUND
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
            <RefreshControl
              refreshing={isFecthing}
              onRefresh={fetchMyPrograms}
            />
          }
          initialNumToRender={5}
          contentContainerStyle={{ margin: 10, paddingBottom: 10 }}
          data={myPrograms}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            let colorBe =
              item?.status.toLowerCase() === "pending" ? "red" : "blue";
            return (
              <Card
                key={`cardItem-${index}`}
                style={{ margin: 5, flexGrow: 1 }}
                onPress={() => navigation.navigate("Program Details", item)}
              >
                <Card.Content
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome5
                      name="users"
                      size={30}
                      color={theme.colors.primary}
                    />
                    <View>
                      <Text variant="titleLarge" style={{ marginLeft: 15 }}>
                        {item?.agency?.agency}
                      </Text>
                      <Text
                        variant="bodySmall"
                        style={{ marginLeft: 15, color: colorBe }}
                      >
                        {item?.status.toUpperCase()}
                      </Text>
                      <Text variant="bodySmall" style={{ marginLeft: 15 }}>
                        (Tap to view details)
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
      <Text style={{ alignSelf: "center", marginTop: 5 }}>
        (Scroll up to view more programs applied)
      </Text>
      <View style={{ alignSelf: "center" }}>
        <FontAwesome5 name="chevron-down" />
      </View>
    </View>
  );
}

export default MyProgramsList;
