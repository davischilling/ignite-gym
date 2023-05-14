import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "@/domain/storage/index";
import { api } from "@/domain/services/api";
import { AuthTokenModel } from "@/domain/models/Token";

export async function setStorageAuthToken(authToken: AuthTokenModel) {
  await AsyncStorage.setItem(
    `${AUTH_TOKEN_STORAGE}`,
    JSON.stringify(authToken)
  );
  api.defaults.headers.authorization = `Bearer ${authToken}`;
}

export async function getStorageAuthToken(): Promise<AuthTokenModel> {
  const storage = await AsyncStorage.getItem(`${AUTH_TOKEN_STORAGE}`);
  const authToken: AuthTokenModel = storage ? JSON.parse(storage) : {};
  return authToken;
}

export async function deleteStorageAuthToken() {
  await AsyncStorage.setItem(`${AUTH_TOKEN_STORAGE}`, JSON.stringify({}));
}
