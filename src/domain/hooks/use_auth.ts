import { useContext } from "react";

import { AuthContext } from "@/presentation/contexts/auth";

export function useAuth() {
  return useContext(AuthContext);
}
