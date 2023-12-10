import AsyncStorage from "@react-native-async-storage/async-storage";
import { alerts } from "./Alerts";

export const storage = {
    setItem: async (key, data) => {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    },
    multiSet: async (args) => {
        try {
            return await AsyncStorage.multiSet(args);
        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    },
    getItem: async (key) => {
        try {
            let data = await AsyncStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    },
    multiGet: async (args) => {
        try {
            return await AsyncStorage.multiGet(args);
        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    },
    removeItem: async (key) => {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    },
    clear: async () => {
        try {
            return await AsyncStorage.clear();
        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    }
}
