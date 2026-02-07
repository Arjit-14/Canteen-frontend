import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { vendorAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../hooks/useWebSocket';
import { toast } from 'react-hot-toast';
import CancelledItemCard from '../components/student/CancelledItemCard';
import Modal from '../components/common/Modal';
import QRToken from '../components/student/QRToken';
import { PageLoader } from '../components/common/Loader';
import { FiArrowLeft, FiTag, FiRefreshCw } from 'react-icons/fi';

const CancelledItemsPage = () => {
    const { canteenId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(null);
    const [claimedItem, setClaimedItem] = useState(null);
    const [showClaimModal, setShowClaimModal] = useState(false);

    // WebSocket for real-time cancelled item updates
    useWebSocket(null, canteenId, {
        onCancelledItem: (data) => {
            setItems(prev => [data, ...prev]);
            toast.success(`New discounted item available: ${data.itemName}`);
        }
    });

    useEffect(() => {
        fetchCancelledItems();
    }, [canteenId]);

    const fetchCancelledItems = async () => {
        try {
            const { data } = await vendorAPI.getCancelledItems(canteenId);
            setItems(data.data);
        } catch (error) {
            toast.error('Failed to load available items');
        } finally {
            setLoading(false);
        }
    };

    const handleClaimItem = async (item) => {
        setClaiming(item._id);
        try {
            const { data } = await vendorAPI.claimItem(item._id);
            setClaimedItem(data.data);
            setShowClaimModal(true);

            // Remove from list
            setItems(prev => prev.filter(i => i._id !== item._id));
            toast.success('Item claimed! Show QR to collect.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to claim item');
        } finally {
            setClaiming(null);
        }
    };

    if (loading) return <PageLoader />;

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back link */}
                <Link
                    to={`/menu/${canteenId}`}
                    className="inline-flex items-center space-x-2 text-dark-400 hover:text-white mb-6 transition-colors"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    <span>Back to Menu</span>
                </Link>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <FiTag className="w-6 h-6 text-secondary-400" />
                            <h1 className="text-3xl font-bold text-white">Available Now</h1>
                        </div>
                        <p className="text-dark-400">
                            Grab discounted items from cancelled orders. Claim instantly!
                        </p>
                    </div>

                    <button
                        onClick={fetchCancelledItems}
                        className="p-3 rounded-xl bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600 transition-all"
                        title="Refresh"
                    >
                        <FiRefreshCw className="w-5 h-5" />
                    </button>
                </div>

                {/* Info Banner */}
                <div className="card p-4 mb-6 border-l-4 border-secondary-500">
                    <div className="flex items-start space-x-3">
                        <span className="text-2xl">💡</span>
                        <div>
                            <p className="text-white font-medium">How it works</p>
                            <p className="text-sm text-dark-400">
                                When someone cancels an order after food is prepared, it becomes available here at 5-10% discount.
                                Claim it and pick up immediately - no waiting!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Items List */}
                {items.length > 0 ? (
                    <div className="space-y-4">
                        {items.map(item => (
                            <CancelledItemCard
                                key={item._id}
                                item={item}
                                onClaim={handleClaimItem}
                                claiming={claiming === item._id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No Items Available</h3>
                        <p className="text-dark-400 mb-6">
                            Check back later for discounted items from cancelled orders
                        </p>
                        <Link to={`/menu/${canteenId}`} className="btn-primary inline-block">
                            Order from Menu
                        </Link>
                    </div>
                )}

                {/* Claim Success Modal */}
                <Modal
                    isOpen={showClaimModal}
                    onClose={() => setShowClaimModal(false)}
                    title="Item Claimed!"
                    size="sm"
                >
                    <div className="text-center">
                        <div className="text-4xl mb-4">🎉</div>
                        <p className="text-white font-medium mb-2">{claimedItem?.itemName}</p>
                        <p className="text-secondary-400 text-xl font-bold mb-6">
                            ₹{claimedItem?.discountedPrice}
                        </p>

                        {claimedItem?.qrToken && (
                            <div className="mb-6">
                                <QRToken token={claimedItem.qrToken} size={150} />
                            </div>
                        )}

                        <p className="text-sm text-dark-400 mb-4">
                            Show this QR code at the counter to collect your item
                        </p>

                        <button
                            onClick={() => setShowClaimModal(false)}
                            className="btn-primary w-full"
                        >
                            Got it!
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default CancelledItemsPage;
