import * as React from "react";
import { FAB } from "react-native-paper";

const FabMenu = ({ navigation, options }) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <FAB.Group
      open={open}
      visible
      icon={open ? "close" : "menu-open"}
      actions={[
        {
          icon: "account-plus",
          label: "Add New Youth",
          size: "medium",
          onPress: () => navigation.navigate("AddYouth"),
        },
        {
          icon: "cloud-upload",
          label: "Bulk-upload Youth Records",
          size: "medium",
          onPress: () => options.bulkUploadYouth(),
        },
        {
          icon: "sync",
          label: "Refresh Youth List",
          size: "medium",
          onPress: () => options.fetchYouths(),
        },
        {
          icon: "trash-can",
          label: "Clear all records",
          size: "medium",
          onPress: () => options.clearYouths(),
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // do something if the speed dial is open
        }
      }}
    />
  );
};

export default FabMenu;
