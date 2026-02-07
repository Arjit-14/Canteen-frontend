import { FiTag, FiClock, FiShoppingCart } from 'react-icons/fi';
import { getFoodImage } from '../../utils/images';
import Button from '../common/Button';

const CancelledItemCard = ({ item, onClaim, claiming = false }) => {
    const timeLeft = Math.max(0, Math.round((new Date(item.expiresAt) - new Date()) / 60000));

    return (
        <div className="card p-4 border-l-4 border-secondary-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-dark-700">
                        <img
                            src={getFoodImage(item.itemName)}
                            alt={item.itemName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = 'https://source.unsplash.com/200x200/?food';
                            }}
                        />
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">{item.itemName}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                            {/* Original price */}
                            <span className="text-sm text-dark-400 line-through">₹{item.originalPrice}</span>
                            {/* Discounted price */}
                            <span className="text-lg font-bold text-secondary-400">₹{item.discountedPrice}</span>
                            {/* Discount badge */}
                            <span className="badge bg-secondary-500/20 text-secondary-400">
                                <FiTag className="inline w-3 h-3 mr-1" />
                                {item.discountPercent}% OFF
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                    {/* Time left */}
                    <div className="flex items-center space-x-1 text-sm text-yellow-400">
                        <FiClock className="w-4 h-4" />
                        <span>{timeLeft} min left</span>
                    </div>

                    {/* Claim button */}
                    <Button
                        variant="success"
                        size="sm"
                        onClick={() => onClaim(item)}
                        loading={claiming}
                    >
                        <FiShoppingCart className="w-4 h-4 mr-1" />
                        Claim
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CancelledItemCard;
