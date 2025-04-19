import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/Dashboard/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticatedValidation = localStorage.getItem("isAuthenticated");

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticatedValidation ? (
              <DashboardPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
