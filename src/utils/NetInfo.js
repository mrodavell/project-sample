import NetInfo from "@react-native-community/netinfo";

export const netinfo = {
  check: async () => {
    return NetInfo.fetch().then((state) => {
      return state;
    });
  },
};
