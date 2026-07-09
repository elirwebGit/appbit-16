import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import DashboardPage from "./pages/DashboardPage";
import RegionsPage from "./pages/RegionsPage";
import EmployabilityPage from "./pages/EmployabilityPage";
import FormationsPage from "./pages/FormationsPage";
import MentalHealthPage from "./pages/MentalHealthPage";
import HistoryPage from "./pages/HistoryPage";
import CrossRegionPage from "./pages/CrossRegionPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ConsultaIAView } from "./pages/ConsultaIAView";
import PainelView from "./pages/PainelView";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/create-account" element={<CreateAccountPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/regions"
        element={
          <ProtectedRoute>
            <RegionsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employability"
        element={
          <ProtectedRoute>
            <EmployabilityPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/formations"
        element={
          <ProtectedRoute>
            <FormationsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mental-health"
        element={
          <ProtectedRoute>
            <MentalHealthPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cross-region"
        element={
          <ProtectedRoute>
            <CrossRegionPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/consulta-ia"
        element={
          <ProtectedRoute>
            <ConsultaIAView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/painel"
        element={
          <ProtectedRoute>
            <PainelView />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
