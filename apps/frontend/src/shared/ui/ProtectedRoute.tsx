import { Spin } from "antd";
import { useUnit } from "effector-react";
import { Navigate } from "react-router-dom";

import { $user, $isLoading } from "@shared/lib/effector/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useUnit([$user, $isLoading]);

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
