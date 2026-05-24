// features/auth/index.ts
import { useUnit } from "effector-react";

import {
  $user,
  $isLoading,
  loginFx,
  registerFx,
  logoutFx,
} from "@shared/lib/effector/auth";

export const useAuth = () => {
  const [user, loading, login, register, logout] = useUnit([
    $user,
    $isLoading,
    loginFx,
    registerFx,
    logoutFx,
  ]);
  return { user, loading, login, register, logout };
};
