import { AuthTokenModel } from "@/domain/models/Token";
import { UserModel } from "@/domain/models/User";
import { Service } from "@/domain/services/index";
import { SignUpFormData } from "@/domain/validations/signUp";
import { AxiosInstance } from "axios";

export class SignUpService extends Service<SignUpFormData, UserModel> {
  constructor(
    private readonly api: AxiosInstance,
    private readonly setUserModel: (user: UserModel) => Promise<void>,
    private readonly setAuthTokenModel: (user: AuthTokenModel) => Promise<void>
  ) {
    super();
  }
  async perform({ email, password }: SignUpFormData): Promise<UserModel> {
    await this.api.post("/users", {
      name,
      email,
      password,
    });
    const { data } = await this.api.post("/sessions", {
      email,
      password,
    });
    await this.setUserModel(data.user);
    await this.setAuthTokenModel(data.token);
    return data.user as UserModel;
  }
}
