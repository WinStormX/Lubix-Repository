import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "lubix_";

export const secureStore = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(`${PREFIX}${key}`);
    } catch {
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(`${PREFIX}${key}`, value);
    } catch {
      // ignore storage errors
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${PREFIX}${key}`);
    } catch {
      // ignore
    }
  },
};