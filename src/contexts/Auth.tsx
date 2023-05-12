import { api } from "@/services/api";
import { deleteStorageAuthToken, getStorageAuthToken, setStorageAuthToken } from "@/storage/token";
import { deleteStorageUser, setStorageUser, UserStorage } from "@/storage/user";
import { getStorageUser } from "@/storage/user/get";
import { AppError } from "@/utils/AppError";
import { setStorageUserAndAuthToken } from "@/utils/setStorageUserAndToken";
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
      await setStorageUserAndAuthToken({
        user: data.user,
        authToken: data.token,
        setUser,
      });
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
      await setStorageUserAndAuthToken({
        user: data.user,
        authToken: data.token,
        setUser,
      });
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
      await deleteStorageAuthToken();
    } catch (err) {
      throw err;
    } finally {
      setIsLoadingUserFromStorage(false);
    }
  };

  const loadAuthStorageInitialState = async () => {
    try {
      await getStorageUser(setUser);
      await getStorageAuthToken((authToken: string) => {
        api.defaults.headers.authorization = `Bearer ${authToken}`;
      });
    } catch (err) {
      throw err;
    } finally {
      setIsLoadingUserFromStorage(false);
    }
  };

  useEffect(() => {
    loadAuthStorageInitialState();
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
