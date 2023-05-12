import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "@/storage/config";
import { AuthTokenStorage } from "./types";
import { api } from "@/services/api";

export async function setStorageAuthToken(authToken: AuthTokenStorage) {
  await AsyncStorage.setItem(`${AUTH_TOKEN_STORAGE}`, JSON.stringify(authToken));
  api.defaults.headers.authorization = `Bearer ${authToken}`;
}
