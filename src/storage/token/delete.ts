import { AUTH_TOKEN_STORAGE } from "@/storage/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function deleteStorageAuthToken() {
  await AsyncStorage.setItem(`${AUTH_TOKEN_STORAGE}`, JSON.stringify({}));
}
