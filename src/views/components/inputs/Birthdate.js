import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { MaskedTextInput } from "react-native-mask-text";

export default function Birthdate(props) {
  const [defaultDate, setDefaultDate] = React.useState(
    props.values.birthdate ?? ""
  );

  const isValidDate = (date) => {
    return !isNaN(new Date(date));
  };

  const handleChange = (date) => {
    if (isValidDate(date)) {
      setDefaultDate(date);
      if (props.setFieldValue) {
        props.setFieldValue(date);
      }
    }
  };

  return (
    <View>
      <TextInput
        label="Birthdate *"
        mode="outlined"
        value={defaultDate}
        defaultValue={defaultDate}
        style={{ marginTop: 10 }}
        placeholder="MM/DD/YYYY"
        left={<TextInput.Icon icon="calendar" />}
        error={props.errors}
        editable={props.editable}
        keyboardType="numeric"
        onChangeText={(text) => handleChange(text)}
        render={(props) => <MaskedTextInput {...props} mask="99/99/9999" />}
      />
    </View>
  );
}
