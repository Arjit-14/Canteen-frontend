import { FiClock, FiAlertTriangle } from 'react-icons/fi';

const TimeSlotPicker = ({ slots, selectedSlot, onSelect }) => {
    const getRushColor = (intensity) => {
        if (intensity < 0.4) return 'bg-green-500/20 text-green-400 border-green-500/30';
        if (intensity < 0.7) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    };

    const getRushLabel = (intensity) => {
        if (intensity < 0.4) return 'Low';
        if (intensity < 0.7) return 'Medium';
        return 'High Rush';
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-dark-400 mb-4">
                <FiAlertTriangle className="w-4 h-4" />
                <span>Slots in red indicate peak rush hours with potential delays</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slots.map((slot, index) => {
                    const isSelected = selectedSlot?.start === slot.start;

                    return (
                        <button
                            key={index}
                            onClick={() => onSelect(slot)}
                            className={`
                relative p-4 rounded-xl border transition-all duration-300
                ${isSelected
                                    ? 'bg-primary-500/20 border-primary-500 ring-2 ring-primary-500/30'
                                    : `${getRushColor(slot.rushIntensity)} hover:border-primary-500/50`
                                }
              `}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <FiClock className="w-4 h-4" />
                                <span className="font-medium">{slot.label.split(' - ')[0]}</span>
                            </div>

                            <div className="mt-2 text-xs opacity-75">
                                {getRushLabel(slot.rushIntensity)}
                            </div>

                            {/* Rush intensity bar */}
                            <div className="mt-2 h-1 bg-dark-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${slot.rushIntensity < 0.4 ? 'bg-green-500' :
                                            slot.rushIntensity < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${slot.rushIntensity * 100}%` }}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TimeSlotPicker;
