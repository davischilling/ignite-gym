import { api } from "@/domain/services/api";
import { SignInService } from "@/domain/services/auth/signIn";
import { setStorageAuthToken } from "@/domain/storage/token";
import { setStorageUser } from "@/domain/storage/user";

export const makeSignInService = () => {
  return new SignInService(api, setStorageUser, setStorageAuthToken);
};
