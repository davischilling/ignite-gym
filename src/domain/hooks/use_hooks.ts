import { AuthContext } from "@/presentation/contexts/auth";
import { useToast } from "native-base";
import { useContext } from "react";

export function useHooks() {
  const toast = useToast();
  const auth = useContext(AuthContext);
  return {
    toast,
    auth,
  };
}
