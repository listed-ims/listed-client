import { AUTH_TOKEN_KEY } from "@listed-constants";
import * as SecureStore from "expo-secure-store";

export const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.log("Error storing token:", error);
  }
};

export const clearToken = async () => {
  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.log("Error deleting token:", error);
  }
};
