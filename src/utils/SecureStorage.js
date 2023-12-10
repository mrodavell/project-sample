import * as SecureStore from 'expo-secure-store';
import { alerts } from './Alerts';

export const secureStorage = {
    setItem: async (key, data) => {
        try {
            return await SecureStore.setItemAsync(key, JSON.stringify(data));
        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    },
    getItem: async (key) => {
        try {
            return JSON.parse(await SecureStore.getItemAsync(key))
        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    },
    removeItem: async (key) => {
        try {
            return await SecureStore.deleteItemAsync(key);
        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    }
} 