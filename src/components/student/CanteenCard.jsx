import { FiMapPin, FiClock, FiUsers } from 'react-icons/fi';
import { getCanteenImage } from '../../utils/images';

const CanteenCard = ({ canteen, onClick }) => {
    const loadPercentage = (canteen.currentLoad / canteen.maxCapacity) * 100;

    const getLoadColor = () => {
        if (loadPercentage < 40) return 'bg-green-500';
        if (loadPercentage < 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div
            onClick={() => onClick(canteen)}
            className="card card-hover p-6 cursor-pointer group"
        >
            {/* Image */}
            <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-dark-700">
                <img
                    src={getCanteenImage(canteen.name)}
                    alt={canteen.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />

                {/* Load indicator */}
                <div className="absolute top-3 right-3 flex items-center space-x-1 bg-dark-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <div className={`w-2 h-2 rounded-full ${getLoadColor()} animate-pulse`} />
                    <span className="text-xs text-white">{canteen.currentLoad}/{canteen.maxCapacity}</span>
                </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                {canteen.name}
            </h3>

            <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                    <FiMapPin className="w-4 h-4 text-red-500" />
                    <span>{canteen.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FiClock className="w-4 h-4 text-red-500" />
                    <span>{canteen.openTime} - {canteen.closeTime}</span>
                </div>
            </div>

            {/* Load bar */}
            <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Kitchen Load</span>
                    <span>{Math.round(loadPercentage)}%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${getLoadColor()} transition-all duration-500`}
                        style={{ width: `${loadPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CanteenCard;
