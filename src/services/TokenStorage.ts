import * as SecureStore from "expo-secure-store";

const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("jwtToken", token);
  } catch (error) {
    console.log("Error storing token:", error);
  }
};

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("jwtToken");
    // console.log(token);
    return token;
  } catch (error) {
    console.log("Error retrieving token:", error);
  }
};

const clearToken = async () => {
  try {
    await SecureStore.deleteItemAsync("jwtToken");
  } catch (error) {
    console.log("Error deleting token:", error);
  }
};

export { storeToken, getToken, clearToken };
