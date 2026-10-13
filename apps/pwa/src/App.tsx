import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardProvider } from "./contexts/DashboardContext";
import { getToken } from "./services/api";

const LoginPage = lazy(() => import("./pages/LoginPage").then((m) => ({ default: m.LoginPage })));
const CreateAccountPage = lazy(() => import("./pages/CreateAccountPage").then((m) => ({ default: m.CreateAccountPage })));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const RegionsPage = lazy(() => import("./pages/RegionsPage"));
const EmployabilityPage = lazy(() => import("./pages/EmployabilityPage"));
const FormationsPage = lazy(() => import("./pages/FormationsPage"));
const MentalHealthPage = lazy(() => import("./pages/MentalHealthPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const CrossRegionPage = lazy(() => import("./pages/CrossRegionPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage").then((m) => ({ default: m.ProfilePage })));
const ConsultaIAView = lazy(() => import("./pages/ConsultaIAView").then((m) => ({ default: m.ConsultaIAView })));
const PainelView = lazy(() => import("./pages/PainelView"));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = !!getToken();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function RouteFallback() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--nexo-paper)" }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "4px solid #eee4d8",
          borderTopColor: "var(--nexo-yellow-strong)",
          animation: "route-spin 0.9s linear infinite",
        }}
      />
      <style>{`@keyframes route-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/regions" element={<ProtectedRoute><RegionsPage /></ProtectedRoute>} />
          <Route path="/employability" element={<ProtectedRoute><EmployabilityPage /></ProtectedRoute>} />
          <Route path="/formations" element={<ProtectedRoute><FormationsPage /></ProtectedRoute>} />
          <Route path="/mental-health" element={<ProtectedRoute><MentalHealthPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="/cross-region" element={<ProtectedRoute><CrossRegionPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/consulta-ia" element={<ProtectedRoute><ConsultaIAView /></ProtectedRoute>} />
          <Route path="/painel" element={<ProtectedRoute><PainelView /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </DashboardProvider>
  );
}

export default App;
