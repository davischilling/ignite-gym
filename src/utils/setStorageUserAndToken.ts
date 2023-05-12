import { setStorageAuthToken } from "@/storage/token";
import { setStorageUser, UserStorage } from "@/storage/user";

type Props = {
  setUser: (user: UserStorage) => void;
  user: UserStorage;
  authToken: string;
};

export const setStorageUserAndAuthToken = async ({
  setUser,
  user,
  authToken,
}: Props) => {
  user &&
    authToken &&
    (await setStorageUser(user, async () => {
      await setStorageAuthToken(authToken);
      setUser(user);
    }));
};
