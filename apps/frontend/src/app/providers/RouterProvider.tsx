import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@pages/Login";
import ProfilePage from "@pages/Profile/ui";
import RegisterPage from "@pages/Register";
import UsersPage from "@pages/Users";
import Layout from "@shared/ui/Layout";
import ProtectedRoute from "@shared/ui/ProtectedRoute";

const RouterProvider = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default RouterProvider;
