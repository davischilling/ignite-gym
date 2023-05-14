import { api } from "@/domain/services/api";
import { SignUpService } from "@/domain/services/auth/signUp";
import { setStorageAuthToken } from "@/domain/storage/token";
import { setStorageUser } from "@/domain/storage/user";

export const makeSignUpService = () => {
  return new SignUpService(api, setStorageUser, setStorageAuthToken);
};
