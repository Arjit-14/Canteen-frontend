import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { vendorAPI, canteenAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../hooks/useWebSocket';
import { toast } from 'react-hot-toast';
import OrderCard from '../components/vendor/OrderCard';
import QRScanner from '../components/vendor/QRScanner';
import Modal from '../components/common/Modal';
import { PageLoader } from '../components/common/Loader';
import { FiGrid, FiClock, FiCheck, FiPackage, FiRefreshCw } from 'react-icons/fi';

const VendorDashboardPage = () => {
    const { canteenId } = useParams();
    const { user } = useAuth();
    const [canteens, setCanteens] = useState([]);
    const [selectedCanteen, setSelectedCanteen] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scanning, setScanning] = useState(false);
    const [showScanResult, setShowScanResult] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    // WebSocket for real-time updates
    useWebSocket(null, selectedCanteen?._id, {
        onNewOrder: (data) => {
            setOrders(prev => [data, ...prev]);
            toast.success(`New order from ${data.studentName}!`, {
                icon: '🔔',
                duration: 5000
            });
        },
        onOrderUpdate: (data) => {
            setOrders(prev => prev.map(o =>
                o._id === data.orderId ? { ...o, status: data.status } : o
            ));
        },
        onPrepReminder: (data) => {
            toast(`Time to prepare order!`, {
                icon: '⏰',
                duration: 10000
            });
        }
    });

    useEffect(() => {
        fetchCanteens();
    }, []);

    useEffect(() => {
        if (selectedCanteen) {
            fetchOrders();
        }
    }, [selectedCanteen, activeTab]);

    const fetchCanteens = async () => {
        try {
            const { data } = await canteenAPI.getAll();
            setCanteens(data.data);
            // Select first canteen or by ID
            const initial = canteenId !== 'main'
                ? data.data.find(c => c._id === canteenId)
                : data.data[0];
            setSelectedCanteen(initial);
        } catch (error) {
            toast.error('Failed to load canteens');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        if (!selectedCanteen) return;

        try {
            const status = activeTab === 'all' ? undefined : activeTab;
            const { data } = await vendorAPI.getOrders(selectedCanteen._id, status);
            setOrders(data.data);
        } catch (error) {
            toast.error('Failed to load orders');
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await vendorAPI.updateStatus(orderId, newStatus);
            setOrders(prev => prev.map(o =>
                o._id === orderId ? { ...o, status: newStatus } : o
            ));
            toast.success(`Order marked as ${newStatus}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update order');
        }
    };

    const handleScanQR = async (token) => {
        setScanning(true);
        try {
            const { data } = await vendorAPI.scanQR(token);
            setScanResult(data.data);
            setShowScanResult(true);

            // Remove collected order from list
            if (data.data.type === 'order') {
                setOrders(prev => prev.filter(o => o._id !== data.data.orderId));
            }

            toast.success('Collection successful!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid QR code');
        } finally {
            setScanning(false);
        }
    };

    const tabs = [
        { key: 'all', label: 'All', icon: FiGrid },
        { key: 'confirmed', label: 'Pending', icon: FiClock },
        { key: 'preparing', label: 'Preparing', icon: FiPackage },
        { key: 'ready', label: 'Ready', icon: FiCheck },
    ];

    const stats = {
        total: orders.length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        ready: orders.filter(o => o.status === 'ready').length,
    };

    if (loading) return <PageLoader />;

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Vendor Dashboard</h1>
                        <div className="flex items-center space-x-2">
                            <select
                                value={selectedCanteen?._id || ''}
                                onChange={(e) => {
                                    const canteen = canteens.find(c => c._id === e.target.value);
                                    setSelectedCanteen(canteen);
                                }}
                                className="input py-2"
                            >
                                {canteens.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <button
                            onClick={fetchOrders}
                            className="p-3 rounded-xl bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600 transition-all"
                            title="Refresh"
                        >
                            <FiRefreshCw className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="card p-4">
                        <p className="text-dark-400 text-sm">Total Orders</p>
                        <p className="text-2xl font-bold text-white">{stats.total}</p>
                    </div>
                    <div className="card p-4 border-l-4 border-blue-500">
                        <p className="text-dark-400 text-sm">Pending</p>
                        <p className="text-2xl font-bold text-blue-400">{stats.confirmed}</p>
                    </div>
                    <div className="card p-4 border-l-4 border-orange-500">
                        <p className="text-dark-400 text-sm">Preparing</p>
                        <p className="text-2xl font-bold text-orange-400">{stats.preparing}</p>
                    </div>
                    <div className="card p-4 border-l-4 border-green-500">
                        <p className="text-dark-400 text-sm">Ready</p>
                        <p className="text-2xl font-bold text-green-400">{stats.ready}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Orders List */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="flex space-x-2 mb-6 overflow-x-auto">
                            {tabs.map(tab => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${activeTab === tab.key
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-dark-700 text-dark-300 hover:text-white'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Orders */}
                        {orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <OrderCard
                                        key={order._id}
                                        order={order}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="card p-12 text-center">
                                <div className="text-6xl mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-white mb-2">No Orders</h3>
                                <p className="text-dark-400">
                                    {activeTab === 'all'
                                        ? 'No active orders at the moment'
                                        : `No ${activeTab} orders`}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* QR Scanner */}
                    <div className="lg:col-span-1">
                        <QRScanner onScan={handleScanQR} scanning={scanning} />
                    </div>
                </div>

                {/* Scan Result Modal */}
                <Modal
                    isOpen={showScanResult}
                    onClose={() => setShowScanResult(false)}
                    title="Collection Complete"
                    size="sm"
                >
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiCheck className="w-8 h-8 text-green-400" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">
                            {scanResult?.studentName}
                        </h3>

                        <div className="space-y-2 text-left bg-dark-700/50 rounded-xl p-4 mb-4">
                            {scanResult?.items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <span className="text-dark-300">{item.quantity}x {item.name}</span>
                                </div>
                            ))}
                        </div>

                        {scanResult?.type === 'order' && (
                            <p className="text-lg font-bold text-primary-400 mb-4">
                                ₹{scanResult.totalAmount}
                            </p>
                        )}
                        {scanResult?.type === 'claim' && (
                            <p className="text-secondary-400 mb-4">
                                Discounted: ₹{scanResult.discountedPrice}
                            </p>
                        )}

                        <button
                            onClick={() => setShowScanResult(false)}
                            className="btn-primary w-full"
                        >
                            Done
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default VendorDashboardPage;
