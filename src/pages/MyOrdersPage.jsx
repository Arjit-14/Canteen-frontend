import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../api/axios';
import { toast } from 'react-hot-toast';
import { PageLoader } from '../components/common/Loader';
import { FiClock, FiMapPin, FiChevronRight, FiShoppingBag } from 'react-icons/fi';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await orderAPI.getMyOrders();
            setOrders(data.data);
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const statusColors = {
        pending: 'bg-yellow-500/20 text-yellow-400',
        confirmed: 'bg-blue-500/20 text-blue-400',
        preparing: 'bg-orange-500/20 text-orange-400',
        ready: 'bg-green-500/20 text-green-400',
        collected: 'bg-gray-500/20 text-gray-400',
        cancelled: 'bg-red-500/20 text-red-400',
    };

    if (loading) return <PageLoader />;

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                        <FiShoppingBag className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">My Orders</h1>
                        <p className="text-dark-400">Track all your orders</p>
                    </div>
                </div>

                {/* Orders List */}
                {orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <Link
                                key={order._id}
                                to={`/order/${order._id}`}
                                className="card p-4 flex items-center justify-between hover:border-primary-500/50 transition-all group"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                                            {order.status}
                                        </span>
                                        <span className="text-xs text-dark-400">
                                            {formatDate(order.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-2 text-sm text-dark-400 mb-1">
                                        <FiMapPin className="w-4 h-4" />
                                        <span>{order.canteenId?.name || 'Canteen'}</span>
                                    </div>

                                    <div className="flex items-center space-x-2 text-sm text-dark-400">
                                        <FiClock className="w-4 h-4" />
                                        <span>Pickup: {formatTime(order.pickupSlot.start)}</span>
                                    </div>

                                    <div className="mt-2 text-sm text-dark-300">
                                        {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <span className="text-lg font-bold text-primary-400">₹{order.totalAmount}</span>
                                    <FiChevronRight className="w-5 h-5 text-dark-400 group-hover:text-primary-400 transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No Orders Yet</h3>
                        <p className="text-dark-400 mb-6">Start ordering from your favorite canteen!</p>
                        <Link to="/canteens" className="btn-primary">
                            Browse Canteens
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;
