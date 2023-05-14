import { makeSignInService, makeSignUpService } from "@/domain/factories/auth";
import { StatefulUseCase } from "@/domain/hooks/use_stateful_uc";
import { UserModel } from "@/domain/models/User";
import { api } from "@/domain/services/api";
import { deleteStorageAuthToken, getStorageAuthToken } from "@/domain/storage/token";
import { deleteStorageUser, getStorageUser } from "@/domain/storage/user";
import { AppError } from "@/domain/utils/AppError";
import { SignUpFormData } from "@/domain/validations/signUp";
import { SignInFormData } from "@/domain/validations/signIn";
import { IToastProps } from "native-base";

type ToastProps = {
  show: (props: IToastProps) => any;
};

export type State = {
  user: UserModel;
  isLoading: boolean;
  isLoadingUserFromStorage: boolean;
  toast: ToastProps;
};

export const DEFAULT_STATE: State = {
  user: {} as UserModel,
  isLoading: false,
  isLoadingUserFromStorage: true,
  toast: {} as ToastProps,
};

export class AuthContextUseCase extends StatefulUseCase<State> {
  init = async () => {
    await this.loadAuthStorageInitialState();
  }

  loadAuthStorageInitialState = async () => {
    try {
      const user = await getStorageUser();
      const authToken = await getStorageAuthToken();
      this.updateUser(user, () => {
        api.defaults.headers.authorization = `Bearer ${authToken}`;
      });
    } catch (err) {
      throw err;
    } finally {
      this.stopLoadingUserFromStorage();
    }
  };

  handleSignInSubmit = async (params: SignInFormData) => {
    try {
      this.startLoading();
      const user = await makeSignInService().handle(params);
      this.updateUser(user);
    } catch (err) {
      const isAppError = err instanceof AppError;
      const title = isAppError ? err.message : "Erro ao fazer login";
      this.state.toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      this.stopLoading();
    }
  };

  handleSignUpSubmit = async (params: SignUpFormData) => {
    try {
      this.startLoading();
      const user = await makeSignUpService().handle(params);
      this.updateUser(user);
    } catch (err) {
      const isAppError = err instanceof AppError;
      const title = isAppError
        ? err.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";
      this.state.toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      this.stopLoading();
    }
  };

  handleSignOut = async () => {
    try {
      this.startLoadingUserFromStorage();
      await deleteStorageUser();
      await deleteStorageAuthToken();
      this.updateUser({} as UserModel);
    } catch (err) {
      throw err;
    } finally {
      this.stopLoadingUserFromStorage();
    }
  };

  private updateUser(user: UserModel, cb?: () => void) {
    this.setState({ user }, cb);
  }

  private startLoading = () => {
    this.setState({ isLoading: true });
  };

  private stopLoading = () => {
    this.setState({ isLoading: false });
  };

  private startLoadingUserFromStorage = () => {
    this.setState({ isLoadingUserFromStorage: true });
  };

  private stopLoadingUserFromStorage = () => {
    this.setState({ isLoadingUserFromStorage: false });
  };
}
