import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, Text, Divider, HelperText } from "react-native-paper";
import SelectDropdown from "@mrodavell/react-native-select-dropdown";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

function GenericSelect(props) {
  const theme = useTheme();
  const [haveSelected, setHaveSelected] = React.useState(false);
  const styles = makeStyles(theme, props.height ?? 200, haveSelected);

  const withErrors =
    props.errors[props.keyIndex] && props.touched[props.keyIndex];
  const iconColor = withErrors ? "tomato" : "black";

  const handleSelected = (value) => {
    setHaveSelected(true);
    if (props.setFieldValue) {
      props.setFieldValue(value);
    }
  };

  return (
    <React.Fragment>
      <View style={{ marginTop: 10 }}>
        {haveSelected && props.defaultBtnText !== "" && (
          <Text
            variant="bodySmall"
            style={{
              marginLeft: 10,
              paddingLeft: 5,
              backgroundColor: "#FFF",
              height: "25%",
              flex: 0,
              position: "absolute",
              zIndex: 5,
            }}
          >
            {props.defaultBtnText}
          </Text>
        )}
        <SelectDropdown
          data={props.dataList}
          onSelect={(item, _) => {
            handleSelected(item);
          }}
          buttonTextAfterSelection={(item, _) => {
            return item;
          }}
          rowTextForSelection={(item, _) => {
            return item;
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
            props.values[props.keyIndex]
              ? props.values[props.keyIndex]
              : props.defaultBtnText
          }
          renderCustomizedRowChild={(item, _) => {
            return (
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  style={{ marginRight: 10, marginLeft: 5 }}
                />
                <Text variant="titleMedium">{item}</Text>
              </View>
            );
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          dropdownIconPosition={"left"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          errors={withErrors}
          leftIcon={
            <MaterialCommunityIcons
              color={iconColor}
              name={props.leftIcon ?? "format-list-checks"}
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
              <Text variant="titleLarge">
                {props.selectTitle ?? "Select an item"}
              </Text>
              <Divider style={{ marginTop: 10 }} />
            </View>
          }
        />
        {withErrors && (
          <HelperText type="error" visible={props.errors[props.keyIndex]}>
            {props.errors[props.keyIndex]}
          </HelperText>
        )}
      </View>
    </React.Fragment>
  );
}

const makeStyles = (theme, height, haveSelected) =>
  StyleSheet.create({
    dropdown1BtnStyle: {
      width: "100%",
      height: 50,
      backgroundColor: theme.colors.background,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: "#444",
      marginTop: haveSelected ? 5 : 10,
    },
    dropdown1BtnTxtStyle: { textAlign: "left", fontSize: 16 },
    dropdown1DropdownStyle: { justifyContent: "center", height: height },
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

export default GenericSelect;
