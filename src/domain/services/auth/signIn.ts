import { AuthTokenModel } from "@/domain/models/Token";
import { UserModel } from "@/domain/models/User";
import { Service } from "@/domain/services/index";
import { AxiosInstance } from "axios";
import { SignInFormData } from "@/domain/validations/signIn";

export class SignInService extends Service<SignInFormData, UserModel> {
  constructor(
    private readonly api: AxiosInstance,
    private readonly setUserModel: (user: UserModel) => Promise<void>,
    private readonly setAuthTokenModel: (
      user: AuthTokenModel
    ) => Promise<void>
  ) {
    super();
  }
  async perform({ email, password }: SignInFormData): Promise<UserModel> {
    const { data } = await this.api.post("/sessions", {
      email,
      password,
    });
    await this.setUserModel(data.user);
    await this.setAuthTokenModel(data.token);
    return data.user as UserModel;
  }
}
