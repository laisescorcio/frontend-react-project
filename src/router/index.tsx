import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import DashboardPage from "../pages/Dashboard/Dashboard";
import { ProtectedRoute } from "./protectedRoute";
import { useAuth } from "../providers/AuthProvider";
export const RouterApp = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
