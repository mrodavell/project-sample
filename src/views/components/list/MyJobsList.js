import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import {
  Text,
  Card,
  Divider,
  useTheme,
  ActivityIndicator,
  TextInput,
} from "react-native-paper";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { agencyRepository } from "repository/agencyRepository";
import { useAuth } from "context/authContext";
import { alerts } from "utils";
import { useNavigation } from "@react-navigation/native";
import { useDebouncedCallback } from "use-debounce";

function MyJobsList() {
  const { token } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();
  const [myFetchedJobs, setMyFetchedJobs] = React.useState([]);
  const [myJobsToSearch, setMyJobsToSearch] = React.useState([]);
  const [isFecthing, setIsFetching] = React.useState(true);

  const fetchMyJobs = React.useCallback(async () => {
    let init = [];

    try {
      let result = await agencyRepository.getMyJobs(token.token);

      if (!result.error) {
        result.data.map((data, index) => {
          init.push({
            index: index,
            id: data.id,
            name: data.job.posting_title,
            description: data.job.posting_description,
            data: data.job,
            isMyJob: true,
          });
        });
      } else {
        alerts.error({ message: result.message });
      }
    } catch (error) {
      alerts.error({ message: error.toString() });
    } finally {
      setMyJobsToSearch(init);
      setMyFetchedJobs(init);
      setIsFetching(false);
    }
  }, []);

  const searchJobs = useDebouncedCallback((text) => {
    let toSearch = [...myFetchedJobs];

    if (text !== "") {
      let result = toSearch.filter((data) => {
        return data.name.toLowerCase().includes(text.toLowerCase());
      }, []);
      setMyJobsToSearch(result);
    } else {
      let oldData = [...myFetchedJobs];
      setMyJobsToSearch(oldData);
    }
  }, 5);

  React.useEffect(() => {
    fetchMyJobs().catch((error) => {
      alerts.error({ message: error.toString() });
    });
  }, [fetchMyJobs]);

  return (
    <View style={{ flex: 1, marginTop: 5 }}>
      <TextInput
        onChangeText={(text) => searchJobs(text)}
        placeholder="Search for Jobs Applied..."
        mode="outlined"
        style={{ marginHorizontal: 10 }}
      />
      <Divider />
      {isFecthing && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={70} />
        </View>
      )}
      {!isFecthing && myJobsToSearch.length <= 0 && (
        <View style={{ flex: 1, justifyContent: "center" }}>
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
              NO RECORDS FOUND
            </Text>
          </View>
          <Text variant="titleSmall" style={{ alignSelf: "center" }}>
            Pull to refresh
          </Text>
          <MaterialIcons name="arrow-downward" size={15} color="black" />
        </View>
      )}
      {!isFecthing && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isFecthing} onRefresh={fetchMyJobs} />
          }
          initialNumToRender={5}
          contentContainerStyle={{ margin: 10, paddingBottom: 10 }}
          data={myJobsToSearch}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Card
                key={`cardItem-${index}`}
                style={{ margin: 5, flexGrow: 1 }}
                onPress={() => navigation.navigate("Job Details", item)}
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
                      name="briefcase"
                      size={30}
                      color={theme.colors.primary}
                    />
                    <View>
                      <Text variant="titleLarge" style={{ marginLeft: 15 }}>
                        {item.name}
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
        (Scroll up to load other jobs)
      </Text>
      <View style={{ alignSelf: "center" }}>
        <FontAwesome5 name="chevron-down" />
      </View>
    </View>
  );
}

export default MyJobsList;
