import { FiPlus, FiMinus, FiClock } from 'react-icons/fi';
import { getFoodImage } from '../../utils/images';

const MenuItem = ({ item, quantity = 0, onAdd, onRemove }) => {
    return (
        <div className="card p-4 flex items-center space-x-4">
            {/* Image */}
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-dark-700">
                <img
                    src={getFoodImage(item.name)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://source.unsplash.com/200x200/?food';
                    }}
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-white truncate">{item.name}</h3>
                        <p className="text-sm text-dark-400 line-clamp-2">{item.description}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-primary-400">₹{item.price}</span>
                        <div className="flex items-center space-x-1 text-xs text-dark-400">
                            <FiClock className="w-3 h-3" />
                            <span>{item.prepTime} min</span>
                        </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center space-x-2">
                        {quantity > 0 && (
                            <>
                                <button
                                    onClick={() => onRemove(item)}
                                    className="w-8 h-8 rounded-lg bg-dark-700 text-white flex items-center justify-center hover:bg-dark-600 transition-all"
                                >
                                    <FiMinus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-semibold text-white">{quantity}</span>
                            </>
                        )}
                        <button
                            onClick={() => onAdd(item)}
                            className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-all"
                        >
                            <FiPlus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;
