import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CanteenSelectPage from './pages/CanteenSelectPage';
import MenuPage from './pages/MenuPage';
import TimeSlotPage from './pages/TimeSlotPage';
import OrderStatusPage from './pages/OrderStatusPage';
import MyOrdersPage from './pages/MyOrdersPage';
import CancelledItemsPage from './pages/CancelledItemsPage';
import VendorDashboardPage from './pages/VendorDashboardPage';
import Navbar from './components/common/Navbar';

// Protected Route wrapper
const ProtectedRoute = ({ children, vendorOnly = false }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
                    <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-red-500/30"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (vendorOnly && user.role !== 'vendor' && user.role !== 'admin') {
        return <Navigate to="/canteens" replace />;
    }

    return children;
};

function App() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen">
            {user && <Navbar />}
            <main className={user ? 'pt-16' : ''}>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Student routes */}
                    <Route
                        path="/canteens"
                        element={
                            <ProtectedRoute>
                                <CanteenSelectPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/menu/:canteenId"
                        element={
                            <ProtectedRoute>
                                <MenuPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/time-slot/:canteenId"
                        element={
                            <ProtectedRoute>
                                <TimeSlotPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/order/:orderId"
                        element={
                            <ProtectedRoute>
                                <OrderStatusPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-orders"
                        element={
                            <ProtectedRoute>
                                <MyOrdersPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/cancelled-items/:canteenId"
                        element={
                            <ProtectedRoute>
                                <CancelledItemsPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Vendor routes */}
                    <Route
                        path="/vendor/dashboard/:canteenId"
                        element={
                            <ProtectedRoute vendorOnly>
                                <VendorDashboardPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
