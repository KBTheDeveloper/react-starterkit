import { useUnit } from "effector-react";
import { useNavigate } from "react-router-dom";

import { $user, logoutFx } from "@shared/lib/effector/auth";

const useHeader = () => {
  const logout = useUnit(logoutFx);
  const navigate = useNavigate();
  const user = useUnit($user);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return { logout, navigate, handleLogout, user };
};

export default useHeader;
