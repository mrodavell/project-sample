import * as React from "react";
import { Modal, Portal, Text } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "react-native-paper";
const EventModal = ({ isShow, setIsShow, message = "Uploading..." }) => {
  const theme = useTheme();
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Portal>
      <Modal
        visible={isShow}
        dismissable={false}
        onDismiss={() => setIsShow()}
        contentContainerStyle={containerStyle}
      >
        <ActivityIndicator
          animating={true}
          color={theme.colors.primary}
          size={70}
        />
        <Text style={{ marginTop: 20 }} variant="bodyLarge">
          {message}
        </Text>
      </Modal>
    </Portal>
  );
};

export default EventModal;
