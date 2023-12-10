import React from "react";
import { StyleSheet, View } from "react-native";
import {
  useTheme,
  Text,
  Divider,
  HelperText,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import SelectDropdown from "@mrodavell/react-native-select-dropdown";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { addressRepository } from "@repository";
import { alerts } from "utils";

function ProvinceSelect(props) {
  const ref = React.useRef();
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [provinces, setProvinces] = React.useState([]);

  const handleSelected = (value) => {
    if (props.setFieldValue) {
      props.setFieldValue(value);
    }
  };

  const fetchZipcodes = React.useCallback(async () => {
    try {
      let result = await addressRepository.getProvinces();
      if (result !== undefined) {
        let init = [];
        if (result?.data?.length > 0) {
          result?.data.map((data, index) => {
            init.push({ id: index, value: data.province });
          });
        }

        setProvinces(init);
      }
    } catch (error) {
      alerts.error({ message: error.toString() });
    }
  }, []);

  React.useEffect(() => {
    fetchZipcodes().catch((error) => {
      alerts.error({ message: error.toString() });
    });
  }, [fetchZipcodes]);

  return (
    <React.Fragment>
      <SelectDropdown
        ref={ref}
        search
        searchPlaceHolder="Type the province"
        data={provinces}
        disabled={props.editable ? props.editable : false}
        onSelect={(selectedItem, _) => {
          handleSelected(selectedItem.value);
        }}
        buttonTextAfterSelection={(selectedItem, _) => {
          return selectedItem.value;
        }}
        rowTextForSelection={(item, _) => {
          return item.value;
        }}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome5
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#444"}
              size={12}
              style={{ marginRight: 5 }}
            />
          );
        }}
        defaultButtonText={
          props.values.province ? props.values.province : "Province *"
        }
        renderCustomizedRowChild={(selectedItem, _) => {
          return provinces.length > 0 ? (
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <FontAwesome5
                name={selectedItem.icon}
                size={24}
                style={{ marginRight: 10, marginLeft: 5 }}
              />
              <Text variant="titleMedium">{selectedItem?.value}</Text>
            </View>
          ) : (
            <View style={{ justifyContent: "center" }}>
              <ActivityIndicator />
            </View>
          );
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        dropdownIconPosition={"left"}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        errors={props.errors.province && props.touched.province}
        leftIcon={
          <MaterialCommunityIcons
            name="home-city-outline"
            size={22}
            style={{ marginRight: 10, marginLeft: 8 }}
          />
        }
        titleText={
          <View
            style={{
              width: "100%",
              padding: 10,
              justifyContent: "center",
              alignSelf: "center",
              flexDirection: "column",
              backgroundColor: "#FFF",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text variant="titleLarge" style={{ marginTop: 7 }}>
                Select Province
              </Text>
              <Button
                mode="text"
                onPress={() => ref.current.closeDropdown()}
                style={{ marginRight: -15 }}
              >
                <FontAwesome5 name="times" size={18} style={{ color: "red" }} />
              </Button>
            </View>
            <Divider style={{ marginTop: 10 }} />
          </View>
        }
      />
      {props.errors.province && props.touched.province && (
        <HelperText type="error" visible={props.errors.province}>
          {props.errors.province}
        </HelperText>
      )}
    </React.Fragment>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    dropdown1BtnStyle: {
      width: "100%",
      height: 50,
      backgroundColor: theme.colors.background,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: "#444",
      marginTop: 15,
    },
    dropdown1BtnTxtStyle: { textAlign: "left", fontSize: 16 },
    dropdown1DropdownStyle: { justifyContent: "center", height: 400 },
    dropdown1RowStyle: {
      backgroundColor: "#EFEFEF",
      borderBottomColor: "#C5C5C5",
      justifyContent: "flex-start",
      marginTop: -5,
      marginLeft: 10,
      marginBottom: 5,
      marginRight: 10,
    },
    dropdown1RowTxtStyle: { color: "red", textAlign: "left" },
  });

export default ProvinceSelect;
