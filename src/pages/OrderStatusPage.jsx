import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../hooks/useWebSocket';
import { toast } from 'react-hot-toast';
import QRToken from '../components/student/QRToken';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { PageLoader } from '../components/common/Loader';
import { FiArrowLeft, FiClock, FiMapPin, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';

const OrderStatusPage = () => {
    const { orderId } = useParams();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [cancelling, setCancelling] = useState(false);

    // WebSocket for real-time updates
    useWebSocket(user?.id, order?.canteenId?._id, {
        onOrderUpdate: (data) => {
            if (data.orderId === orderId) {
                setOrder(prev => ({ ...prev, status: data.status }));
                toast.success(`Order status updated: ${data.status}`);
            }
        }
    });

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const { data } = await orderAPI.getById(orderId);
            setOrder(data.data);
        } catch (error) {
            toast.error('Failed to load order');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async () => {
        setCancelling(true);
        try {
            await orderAPI.cancel(orderId, cancelReason);
            toast.success('Order cancelled');
            setShowCancelModal(false);
            fetchOrder();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to cancel order');
        } finally {
            setCancelling(false);
        }
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const statusSteps = [
        { key: 'confirmed', label: 'Confirmed', icon: FiCheck },
        { key: 'preparing', label: 'Preparing', icon: FiClock },
        { key: 'ready', label: 'Ready', icon: FiMapPin },
        { key: 'collected', label: 'Collected', icon: FiCheck },
    ];

    const getStatusIndex = () => {
        if (order?.status === 'cancelled') return -1;
        return statusSteps.findIndex(s => s.key === order?.status);
    };

    if (loading) return <PageLoader />;

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <p className="text-dark-400">Order not found</p>
                    <Link to="/canteens" className="btn-primary mt-4 inline-block">
                        Back to Canteens
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Back link */}
                <Link
                    to="/canteens"
                    className="inline-flex items-center space-x-2 text-dark-400 hover:text-white mb-6 transition-colors"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    <span>Back to Canteens</span>
                </Link>

                {/* Status Header */}
                <div className="card p-6 mb-6">
                    {order.status === 'cancelled' ? (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiX className="w-8 h-8 text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-red-400 mb-2">Order Cancelled</h2>
                            <p className="text-dark-400">{order.cancellationReason || 'Order was cancelled'}</p>
                        </div>
                    ) : order.status === 'collected' ? (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                                <FiCheck className="w-8 h-8 text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-green-400 mb-2">Order Collected!</h2>
                            <p className="text-dark-400">Thank you for ordering with Canteen Rush AI</p>
                        </div>
                    ) : (
                        <>
                            {/* Status Progress */}
                            <div className="flex items-center justify-between mb-8">
                                {statusSteps.map((step, idx) => {
                                    const isActive = idx <= getStatusIndex();
                                    const isCurrent = idx === getStatusIndex();
                                    const Icon = step.icon;

                                    return (
                                        <div key={step.key} className="flex flex-col items-center flex-1">
                                            <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isActive ? 'bg-primary-500 text-white' : 'bg-dark-700 text-dark-400'}
                        ${isCurrent ? 'ring-4 ring-primary-500/30 animate-pulse' : ''}
                      `}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className={`text-xs mt-2 ${isActive ? 'text-white' : 'text-dark-400'}`}>
                                                {step.label}
                                            </span>
                                            {idx < statusSteps.length - 1 && (
                                                <div className={`hidden sm:block absolute h-0.5 w-full left-1/2 top-5 -z-10 ${idx < getStatusIndex() ? 'bg-primary-500' : 'bg-dark-700'
                                                    }`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Current Status Message */}
                            <div className={`p-4 rounded-xl ${order.status === 'ready'
                                    ? 'bg-green-500/20 border border-green-500/30'
                                    : 'bg-primary-500/20 border border-primary-500/30'
                                }`}>
                                {order.status === 'confirmed' && (
                                    <p className="text-primary-400 text-center">
                                        Your order is confirmed! Preparation will start soon.
                                    </p>
                                )}
                                {order.status === 'preparing' && (
                                    <p className="text-primary-400 text-center">
                                        Your food is being prepared 👨‍🍳
                                    </p>
                                )}
                                {order.status === 'ready' && (
                                    <p className="text-green-400 text-center font-semibold">
                                        🎉 Your order is ready! Please collect it now.
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* QR Code */}
                {!['cancelled', 'collected'].includes(order.status) && (
                    <div className="card p-6 mb-6">
                        <h3 className="text-lg font-semibold text-white text-center mb-6">
                            Show this QR code at pickup
                        </h3>
                        <div className="flex justify-center">
                            <QRToken token={order.qrToken} size={180} />
                        </div>
                    </div>
                )}

                {/* Order Details */}
                <div className="card p-6 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>

                    {/* Canteen */}
                    <div className="flex items-center space-x-2 text-dark-400 mb-4">
                        <FiMapPin className="w-4 h-4" />
                        <span>{order.canteenId?.name || 'Canteen'}</span>
                    </div>

                    {/* Pickup time */}
                    <div className="flex items-center space-x-2 text-dark-400 mb-4">
                        <FiClock className="w-4 h-4" />
                        <span>Pickup: {formatTime(order.pickupSlot.start)} - {formatTime(order.pickupSlot.end)}</span>
                    </div>

                    {/* Items */}
                    <div className="space-y-2 border-t border-dark-700 pt-4 mt-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <span className="text-dark-300">{item.quantity}x {item.name}</span>
                                <span className="text-white">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between pt-4 border-t border-dark-700 mt-4">
                        <span className="font-semibold text-white">Total</span>
                        <span className="text-xl font-bold text-primary-400">₹{order.totalAmount}</span>
                    </div>
                </div>

                {/* Cancel Button */}
                {['confirmed', 'preparing'].includes(order.status) && (
                    <Button
                        variant="danger"
                        className="w-full"
                        onClick={() => setShowCancelModal(true)}
                    >
                        <FiX className="w-4 h-4 mr-2" />
                        Cancel Order
                    </Button>
                )}

                {/* Cancel Modal */}
                <Modal
                    isOpen={showCancelModal}
                    onClose={() => setShowCancelModal(false)}
                    title="Cancel Order"
                >
                    <div className="space-y-4">
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                            <div className="flex items-start space-x-3">
                                <FiAlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                                <div>
                                    <p className="text-yellow-400 font-medium">Are you sure?</p>
                                    <p className="text-sm text-dark-400 mt-1">
                                        {order.status === 'preparing'
                                            ? 'Your food is being prepared. If you cancel, it will be available at a discount for others.'
                                            : 'You will receive a full refund.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-dark-400 mb-2">Reason (optional)</label>
                            <textarea
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                className="input h-24 resize-none"
                                placeholder="Why are you cancelling?"
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={() => setShowCancelModal(false)}
                            >
                                Keep Order
                            </Button>
                            <Button
                                variant="danger"
                                className="flex-1"
                                onClick={handleCancelOrder}
                                loading={cancelling}
                            >
                                Cancel Order
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default OrderStatusPage;
