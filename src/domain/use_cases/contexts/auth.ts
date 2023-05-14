import { StatefulUseCase } from "@/domain/hooks/use_stateful_uc";
import { AuthTokenModel } from "@/domain/models/token";
import { UserModel } from "@/domain/models/user";
import { api } from "@/domain/services/api";
import { signInService } from "@/domain/services/auth/sign_in";
import { signUpService } from "@/domain/services/auth/sign_up";
import {
  deleteStorageAuthToken,
  getStorageAuthToken,
  setStorageAuthToken,
} from "@/domain/storage/token";
import {
  deleteStorageUser,
  getStorageUser,
  setStorageUser,
} from "@/domain/storage/user";
import { errorHandler } from "@/domain/utils/error_handler";
import { SignInFormData } from "@/domain/validations/signIn";
import { SignUpFormData } from "@/domain/validations/signUp";
import { IToastProps } from "native-base";

export type ToastProps = {
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
  };

  loadAuthStorageInitialState = async () => {
    await errorHandler({
      mainCb: async () => {
        const user = await getStorageUser();
        const authToken = await getStorageAuthToken();
        this.updateUser(user, () => {
          api.defaults.headers.authorization = `Bearer ${authToken}`;
        });
      },
      errorMessage:
        "Erro ao carregar dados do usuário. Tente novamente mais tarde.",
      finallyCb: async () => this.stopLoadingUserFromStorage(),
      toast: this.state.toast,
    });
  };

  handleSignInSubmit = async (params: SignInFormData) => {
    await errorHandler({
      mainCb: async () => {
        this.startLoading();
        const { user, token } = await signInService.handle(params);
        await setStorageUser(user);
        await this.updateAuthToken(token);
        this.updateUser(user);
      },
      errorMessage: "Erro ao fazer login. Tente novamente mais tarde.",
      finallyCb: async () => this.stopLoading(),
      toast: this.state.toast,
    });
  };

  handleSignUpSubmit = async (params: SignUpFormData) => {
    await errorHandler({
      mainCb: async () => {
        this.startLoading();
        const { user, token } = await signUpService.handle(params);
        await setStorageUser(user);
        await this.updateAuthToken(token);
        this.updateUser(user);
      },
      errorMessage:
        "Não foi possível criar a conta. Tente novamente mais tarde.",
      finallyCb: async () => this.stopLoading(),
      toast: this.state.toast,
    });
  };

  handleSignOut = async () => {
    await errorHandler({
      mainCb: async () => {
        this.startLoadingUserFromStorage();
        await deleteStorageUser();
        await deleteStorageAuthToken();
        this.updateUser({} as UserModel);
      },
      errorMessage: "Não foi possível fazer logout.",
      finallyCb: async () => this.stopLoadingUserFromStorage(),
      toast: this.state.toast,
    });
  };

  private updateUser(user: UserModel, cb?: () => void) {
    this.setState({ user }, cb);
  }

  private updateAuthToken = async (authToken: AuthTokenModel) => {
    await setStorageAuthToken(authToken);
    api.defaults.headers.authorization = `Bearer ${authToken}`;
  };

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
