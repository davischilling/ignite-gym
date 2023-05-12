import { USER_STORAGE } from "@/storage/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserStorage } from "./types";

export async function setStorageUser(user: UserStorage, cb: () => void) {
  await AsyncStorage.setItem(`${USER_STORAGE}`, JSON.stringify(user));
  cb();
}
