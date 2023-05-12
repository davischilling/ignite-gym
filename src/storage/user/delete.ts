import { USER_STORAGE } from "@/storage/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function deleteStorageUser(cb: () => void) {
  await AsyncStorage.setItem(`${USER_STORAGE}`, JSON.stringify({}));
  cb();
}
