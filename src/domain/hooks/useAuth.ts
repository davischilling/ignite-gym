import { useContext } from "react";

import { AuthContext } from "@/presentation/contexts/Auth";

export function useAuth() {
  return useContext(AuthContext);
}
