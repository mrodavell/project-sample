import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import {
  Text,
  Divider,
  ActivityIndicator,
  TextInput,
} from "react-native-paper";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import FabMenu from "../fab/FabMenu";
import { useYouthStore } from "zustand/useYouthStore";
import SwipeableCard from "../cards/SwipeableCard";

function TracedYouthList({ navigation, options }) {
  const youths = useYouthStore((state) => state.youths);
  const isLoading = useYouthStore((state) => state.isLoading);
  const status = useYouthStore((state) => state.status);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}
        >
          <ActivityIndicator size={50} />
          <Text variant="titleLarge" style={{ alignSelf: "center" }}>
            {status}
          </Text>
        </View>
      )}
      {!isLoading && youths.length <= 0 && (
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
            NO RECORDS FOUND
          </Text>
          <Text variant="titleSmall" style={{ alignSelf: "center" }}>
            Pull to refresh
          </Text>
          <MaterialIcons name="arrow-downward" size={15} color="black" />
        </View>
      )}
      {!isLoading && (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={options.fetchYouths}
            />
          }
          contentContainerStyle={{ margin: 10, paddingBottom: 10 }}
          data={youths}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => { 
            return (
              <SwipeableCard
                item={item}
                index={index}
                options={options}
                navigation={navigation}
              />
            );
          }}
        />
      )}
      <FabMenu navigation={navigation} options={options} />
    </View>
  );
}

export default TracedYouthList;
