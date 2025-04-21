import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import DashboardPage from "../pages/Dashboard/Dashboard";
import { ProtectedRoute } from "./protectedRoute";
export const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
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
