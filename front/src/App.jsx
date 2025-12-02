import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClinicalView from './pages/ClinicalView';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import QRCode from './pages/QRCode';
import GuestRoutes from './routes/GuestRoutes';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qrcode"
          element={
            <ProtectedRoute>
              <QRCode />
            </ProtectedRoute>
          }
        />
        <Route path="/clinical/:clinicalBadgeId" element={<ClinicalView />} />
        <Route
          path="/login"
          element={
            <GuestRoutes>
              <Login />
            </GuestRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoutes>
              <Register />
            </GuestRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
