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

function JobsList() {
  const { token } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();
  const [fetchJobs, setFetchJobs] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [isFecthing, setIsFetching] = React.useState(true);

  const fetchJobPosts = React.useCallback(async () => {
    let init = [];

    try {
      let result = await agencyRepository.getJobs(token.token);

      if (!result.error) {
        result.data.map((data, index) => {
          init.push({
            index: index,
            id: data.id,
            name: data.posting_title,
            description: data.posting_description,
            data: data,
          });
        });
      } else {
        alerts.error({ message: result.message });
      }
    } catch (error) {
      alerts.error({ message: error.toString() });
    } finally {
      setJobs(init);
      setFetchJobs(init);
      setIsFetching(false);
    }
  }, []);

  const searchJobs = useDebouncedCallback((text) => {
    let toSearch = [...fetchJobs];

    if (text !== "") {
      let result = toSearch.filter((data) => {
        return data.name.toLowerCase().includes(text.toLowerCase());
      }, []);
      setJobs(result);
    } else {
      let oldData = [...fetchJobs];
      setJobs(oldData);
    }
  }, 5);

  React.useEffect(() => {
    fetchJobPosts().catch((error) => {
      alerts.error({ message: error.toString() });
    });
  }, [fetchJobPosts]);

  return (
    <View style={{ flex: 1, marginTop: 5 }}>
      <TextInput
        onChangeText={(text) => searchJobs(text)}
        placeholder="Search for Jobs Posted..."
        mode="outlined"
        style={{ marginHorizontal: 10 }}
      />
      <Divider />
      {isFecthing && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={70} />
        </View>
      )}
      {!isFecthing && jobs.length <= 0 && (
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
            NO JOBS FOUND
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
            <RefreshControl refreshing={isFecthing} onRefresh={fetchJobPosts} />
          }
          initialNumToRender={5}
          contentContainerStyle={{ margin: 10, paddingBottom: 10 }}
          data={jobs}
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

export default JobsList;
