import { api } from "@/services/api";
import { deleteStorageUser, setStorageUser, UserStorage } from "@/storage/user";
import { getStorageUser } from "@/storage/user/get";
import { AppError } from "@/utils/AppError";
import { SignInFormData } from "@/validations/signIn";
import { SignUpFormData } from "@/validations/signUp";
import { useToast } from "native-base";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextDataProps {
  user: UserStorage;
  handleSignInSubmit: (data: SignInFormData) => Promise<void>;
  handleSignUpSubmit: (data: SignUpFormData) => Promise<void>;
  handleSignOut: () => Promise<void>;
  isLoading: boolean;
  isLoadingUserFromStorage: boolean;
}

export const AuthContext = createContext({} as AuthContextDataProps);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const toast = useToast();

  const [user, setUser] = useState<UserStorage>({} as UserStorage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUserFromStorage, setIsLoadingUserFromStorage] =
    useState<boolean>(true);

  const handleSignInSubmit = async ({ email, password }: SignInFormData) => {
    try {
      setIsLoading(true);
      const { data } = await api.post("/sessions", {
        email,
        password,
      });
      data.user && (await setStorageUser(data.user, () => setUser(data.user)));
    } catch (err) {
      const isAppError = err instanceof AppError;
      const title = isAppError ? err.message : "Erro na autenticação";
      setIsLoading(false);
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  const handleSignUpSubmit = async ({
    name,
    email,
    password,
  }: SignUpFormData) => {
    try {
      setIsLoading(true);
      await api.post("/users", {
        name,
        email,
        password,
      });
      const { data } = await api.post("/sessions", {
        email,
        password,
      });
      data.user && (await setStorageUser(data.user, () => setUser(data.user)));
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";
      setIsLoading(false);
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoadingUserFromStorage(true);
      await deleteStorageUser(() => setUser({} as UserStorage));
    } catch (err) {
      throw err;
    } finally {
      setIsLoadingUserFromStorage(false);
    }
  };

  const loadUserFromStorage = async () => {
    try {
      await getStorageUser(setUser);
    } catch (err) {
      throw err;
    } finally {
      setIsLoadingUserFromStorage(false);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignInSubmit,
        handleSignUpSubmit,
        handleSignOut,
        isLoading,
        isLoadingUserFromStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
