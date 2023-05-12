import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "@/storage/config";
import { UserStorage } from "./types";

export async function getStorageUser(
  cb: (user: UserStorage) => void
): Promise<void> {
  const storage = await AsyncStorage.getItem(`${USER_STORAGE}`);
  const user: UserStorage = storage ? JSON.parse(storage) : {};
  cb(user);
}
