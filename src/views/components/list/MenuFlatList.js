import React from "react";
import { View } from "react-native";
import { TouchableRipple, Text, useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { alerts } from "utils";

function MenuFlatList({ navigation }) {
  const theme = useTheme();

  const agencies = [
    { name: "Programs", icon: "user-alt", path: "My Programs" },
    { name: "Jobs", icon: "briefcase", path: "My Jobs" },
    { name: "Scholarships", icon: "award" },
  ];
  return (
    <View style={{ alignItems: "center" }}>
      <SwiperFlatList
        autoplay={false}
        data={agencies}
        index={0}
        renderItem={({ item, index }) => {
          return (
            <TouchableRipple
              key={`listItem-${index}`}
              style={{
                padding: 15,
                paddingTop: 5,
                paddingBottom: 5,
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                if (item?.path) {
                  navigation.navigate(item.path);
                } else {
                  alerts.info({ message: "This feature is not yet available" });
                }
              }}
            >
              <>
                <FontAwesome5
                  name={item.icon}
                  size={60}
                  color={theme.colors.primary}
                />
                <Text variant="bodyMedium">{item.name}</Text>
              </>
            </TouchableRipple>
          );
        }}
      />
    </View>
  );
}

export default MenuFlatList;
