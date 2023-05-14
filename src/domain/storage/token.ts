import { AuthTokenModel } from "@/domain/models/token";
import { AUTH_TOKEN_STORAGE } from "@/domain/storage/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setStorageAuthToken(authToken: AuthTokenModel) {
  await AsyncStorage.setItem(
    `${AUTH_TOKEN_STORAGE}`,
    JSON.stringify(authToken)
  );
}

export async function getStorageAuthToken(): Promise<AuthTokenModel> {
  const storage = await AsyncStorage.getItem(`${AUTH_TOKEN_STORAGE}`);
  const authToken: AuthTokenModel = storage ? JSON.parse(storage) : {};
  return authToken;
}

export async function deleteStorageAuthToken() {
  await AsyncStorage.setItem(`${AUTH_TOKEN_STORAGE}`, JSON.stringify({}));
}
