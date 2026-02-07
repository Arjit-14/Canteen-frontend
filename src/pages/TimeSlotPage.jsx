import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { orderAPI } from '../api/axios';
import { toast } from 'react-hot-toast';
import TimeSlotPicker from '../components/student/TimeSlotPicker';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { PageLoader } from '../components/common/Loader';
import { FiArrowLeft, FiCheck, FiAlertCircle, FiClock, FiShoppingBag } from 'react-icons/fi';

const TimeSlotPage = () => {
    const { canteenId } = useParams();
    const navigate = useNavigate();
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [suggestion, setSuggestion] = useState(null);

    useEffect(() => {
        // Load cart from session storage
        const savedCart = sessionStorage.getItem('cart');
        const savedTotal = sessionStorage.getItem('cartTotal');

        if (!savedCart || JSON.parse(savedCart).length === 0) {
            toast.error('No items in cart');
            navigate(`/menu/${canteenId}`);
            return;
        }

        setCart(JSON.parse(savedCart));
        setCartTotal(parseInt(savedTotal || '0'));
        fetchTimeSlots();
    }, [canteenId]);

    const fetchTimeSlots = async () => {
        try {
            const { data } = await orderAPI.getTimeSlots(canteenId);
            setSlots(data.data);
        } catch (error) {
            toast.error('Failed to load time slots');
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedSlot) {
            toast.error('Please select a pickup time');
            return;
        }

        setSubmitting(true);

        try {
            const orderData = {
                canteenId,
                items: cart.map(item => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity
                })),
                pickupSlot: {
                    start: selectedSlot.start,
                    end: selectedSlot.end
                }
            };

            const { data } = await orderAPI.create(orderData);

            if (data.slotFeasible) {
                // Clear cart
                sessionStorage.removeItem('cart');
                sessionStorage.removeItem('cartTotal');

                toast.success('Order placed successfully!');
                navigate(`/order/${data.order._id}`);
            } else {
                // Show suggestion modal
                setSuggestion({
                    reason: data.reason,
                    suggestedSlot: data.suggestedSlot,
                    currentLoad: data.currentLoad,
                    effectiveCapacity: data.effectiveCapacity
                });
                setShowSuggestion(true);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setSubmitting(false);
        }
    };

    const handleAcceptSuggestion = () => {
        if (suggestion?.suggestedSlot) {
            const newSlot = {
                start: suggestion.suggestedSlot.start,
                end: suggestion.suggestedSlot.end,
                label: formatSlotLabel(suggestion.suggestedSlot.start, suggestion.suggestedSlot.end),
                rushIntensity: 0.3
            };
            setSelectedSlot(newSlot);
            setShowSuggestion(false);
            toast.success('Slot updated! Click Place Order to confirm.');
        }
    };

    const formatSlotLabel = (start, end) => {
        const formatTime = (date) => new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        return `${formatTime(start)} - ${formatTime(end)}`;
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
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-4">
                        <FiClock className="w-8 h-8 text-primary-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Select Pickup Time</h1>
                    <p className="text-dark-400">
                        Choose when you want to collect your order. Our AI will ensure it's ready on time!
                    </p>
                </div>

                {/* Order Summary */}
                <div className="card p-6 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <FiShoppingBag className="w-5 h-5 mr-2 text-primary-400" />
                        Order Summary
                    </h3>

                    <div className="space-y-2 mb-4">
                        {cart.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-dark-300">{item.quantity}x {item.name}</span>
                                <span className="text-white">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between pt-4 border-t border-dark-700">
                        <span className="font-semibold text-white">Total</span>
                        <span className="text-xl font-bold text-primary-400">₹{cartTotal}</span>
                    </div>
                </div>

                {/* Time Slot Picker */}
                <div className="card p-6 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Available Time Slots</h3>
                    <TimeSlotPicker
                        slots={slots}
                        selectedSlot={selectedSlot}
                        onSelect={setSelectedSlot}
                    />
                </div>

                {/* Place Order Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        variant="secondary"
                        className="flex-1 sm:flex-initial"
                        onClick={() => navigate(`/menu/${canteenId}`)}
                    >
                        Modify Order
                    </Button>
                    <Button
                        variant="primary"
                        className="flex-1"
                        onClick={handlePlaceOrder}
                        loading={submitting}
                        disabled={!selectedSlot}
                    >
                        <FiCheck className="w-4 h-4 mr-2" />
                        Place Order - ₹{cartTotal}
                    </Button>
                </div>

                {/* Suggestion Modal */}
                <Modal
                    isOpen={showSuggestion}
                    onClose={() => setShowSuggestion(false)}
                    title="Slot Unavailable"
                >
                    <div className="space-y-4">
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                            <div className="flex items-start space-x-3">
                                <FiAlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                                <div>
                                    <p className="text-yellow-400 font-medium">High Rush Detected</p>
                                    <p className="text-sm text-dark-400 mt-1">{suggestion?.reason}</p>
                                </div>
                            </div>
                        </div>

                        {suggestion?.suggestedSlot && (
                            <div className="p-4 bg-secondary-500/10 border border-secondary-500/30 rounded-xl">
                                <p className="text-secondary-400 font-medium mb-2">Suggested Alternative</p>
                                <p className="text-white text-lg font-bold">
                                    {formatSlotLabel(suggestion.suggestedSlot.start, suggestion.suggestedSlot.end)}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={() => setShowSuggestion(false)}
                            >
                                Choose Different
                            </Button>
                            <Button
                                variant="success"
                                className="flex-1"
                                onClick={handleAcceptSuggestion}
                            >
                                Accept Suggestion
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default TimeSlotPage;
