import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "@/storage/config";
import { AuthTokenStorage } from "./types";

export async function getStorageAuthToken(
  cb: (authToken: AuthTokenStorage) => void
): Promise<void> {
  const storage = await AsyncStorage.getItem(`${AUTH_TOKEN_STORAGE}`);
  const authToken: AuthTokenStorage = storage ? JSON.parse(storage) : {};
  cb(authToken);
}
