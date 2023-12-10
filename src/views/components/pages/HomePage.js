import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import NameCard from "../cards/NameCard";
import AgencyFlatList from "../list/AgencyFlatList";
import MenuFlatList from "../list/MenuFlatList";

function HomePage(props) {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <NameCard />
      <Divider style={{ marginTop: 10 }} />
      <MenuFlatList {...props} />
      <AgencyFlatList {...props} />
    </View>
  );
}

export default HomePage;
