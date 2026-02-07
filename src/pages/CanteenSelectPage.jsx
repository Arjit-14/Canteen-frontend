import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { canteenAPI } from '../api/axios';
import { toast } from 'react-hot-toast';
import CanteenCard from '../components/student/CanteenCard';
import { PageLoader } from '../components/common/Loader';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

const CanteenSelectPage = () => {
    const navigate = useNavigate();
    const [canteens, setCanteens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCanteens();
    }, []);

    const fetchCanteens = async () => {
        try {
            const { data } = await canteenAPI.getAll();
            setCanteens(data.data);
        } catch (error) {
            toast.error('Failed to load canteens');
        } finally {
            setLoading(false);
        }
    };

    const handleCanteenSelect = (canteen) => {
        navigate(`/menu/${canteen._id}`);
    };

    const filteredCanteens = canteens.filter(canteen =>
        canteen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        canteen.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <PageLoader />;

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center space-x-2 mb-4">
                        <HiOutlineSparkles className="w-8 h-8 text-red-500 animate-pulse" />
                        <span className="text-sm font-stranger tracking-wider text-red-400 uppercase">
                            The Upside Down Menu
                        </span>
                    </div>
                    <h1 className="font-stranger text-4xl md:text-5xl text-white mb-4 tracking-wide">
                        CHOOSE YOUR <span className="gradient-text">CANTEEN</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Select a canteen to view their menu and place your pre-order.
                        Skip the queue and pick up your food at your chosen time!
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search canteens..."
                            className="input"
                        />
                    </div>
                </div>

                {/* Canteen Grid */}
                {filteredCanteens.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCanteens.map((canteen) => (
                            <CanteenCard
                                key={canteen._id}
                                canteen={canteen}
                                onClick={handleCanteenSelect}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">👻</div>
                        <p className="text-gray-500 font-stranger text-xl">NO CANTEENS FOUND</p>
                        <p className="text-gray-600 text-sm mt-2">They've gone to the Upside Down...</p>
                    </div>
                )}

                {/* Quick note */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span> Low Rush
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Moderate
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span> Peak Hours
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CanteenSelectPage;
