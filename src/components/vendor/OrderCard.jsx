import { FiClock, FiUser, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Button from '../common/Button';

const OrderCard = ({ order, onStatusChange }) => {
    const statusColors = {
        confirmed: 'border-blue-500 bg-blue-500/10',
        preparing: 'border-orange-500 bg-orange-500/10',
        ready: 'border-green-500 bg-green-500/10 animate-pulse',
    };

    const statusLabels = {
        confirmed: { label: 'Confirmed', next: 'Start Preparing', nextStatus: 'preparing' },
        preparing: { label: 'Preparing', next: 'Mark Ready', nextStatus: 'ready' },
        ready: { label: 'Ready for Pickup', next: null, nextStatus: null },
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className={`card p-4 border-l-4 ${statusColors[order.status] || 'border-dark-500'}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center space-x-2">
                        <FiUser className="w-4 h-4 text-dark-400" />
                        <span className="font-semibold text-white">{order.studentId?.name || 'Student'}</span>
                    </div>
                    <p className="text-xs text-dark-400 mt-1">Token: {order.qrToken}</p>
                </div>

                <div className="text-right">
                    <span className={`badge badge-${order.status}`}>
                        {statusLabels[order.status]?.label || order.status}
                    </span>
                    {order.isUrgent && (
                        <div className="flex items-center space-x-1 text-yellow-400 text-xs mt-1">
                            <FiAlertCircle className="w-3 h-3" />
                            <span>Urgent</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Items */}
            <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-dark-300">
                            {item.quantity}x {item.name}
                        </span>
                        <span className="text-dark-400">{item.prepTime} min</span>
                    </div>
                ))}
            </div>

            {/* Timing info */}
            <div className="flex items-center justify-between text-sm text-dark-400 border-t border-dark-700 pt-4 mb-4">
                <div className="flex items-center space-x-1">
                    <FiClock className="w-4 h-4" />
                    <span>Pickup: {formatTime(order.pickupSlot.start)}</span>
                </div>
                <div>
                    {order.timeUntilPrep > 0 ? (
                        <span className="text-yellow-400">Start in {order.timeUntilPrep} min</span>
                    ) : (
                        <span className="text-green-400">Start now!</span>
                    )}
                </div>
            </div>

            {/* Action button */}
            {statusLabels[order.status]?.next && (
                <Button
                    variant={order.status === 'confirmed' ? 'primary' : 'success'}
                    size="sm"
                    className="w-full"
                    onClick={() => onStatusChange(order._id, statusLabels[order.status].nextStatus)}
                >
                    <FiCheck className="w-4 h-4 mr-1" />
                    {statusLabels[order.status].next}
                </Button>
            )}

            {order.status === 'ready' && (
                <div className="text-center text-sm text-green-400 font-medium">
                    Waiting for student to collect
                </div>
            )}
        </div>
    );
};

export default OrderCard;
