import Toast from "react-native-toast-message";
export const alerts = {
  error: ({ title = "Error", message = "An error has occurred" }) => {
    Toast.show({
      type: "error",
      text1: title,
      text2: message,
      autoHide: true,
      visibilityTime: 5000,
    });
  },
  success: ({ title = "Success", message = "Transaction completed" }) => {
    Toast.show({
      type: "success",
      text1: title,
      text2: message,
      autoHide: true,
      visibilityTime: 5000,
    });
  },
  warning: ({ title = "Hello!", message = "App warning" }) => {
    Toast.show({
      type: "warning",
      text1: title,
      text2: message,
      autoHide: true,
      visibilityTime: 5000,
    });
  },
  info: ({ title = "Hello!", message = "App Info" }) => {
    Toast.show({
      type: "info",
      text1: title,
      text2: message,
      autoHide: true,
      visibilityTime: 3000,
    });
  },
};
