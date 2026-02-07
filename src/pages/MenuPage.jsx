import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { menuAPI, canteenAPI } from '../api/axios';
import { toast } from 'react-hot-toast';
import MenuItem from '../components/student/MenuItem';
import Button from '../components/common/Button';
import { PageLoader } from '../components/common/Loader';
import { FiShoppingCart, FiArrowLeft, FiTag, FiClock } from 'react-icons/fi';

const MenuPage = () => {
    const { canteenId } = useParams();
    const navigate = useNavigate();
    const [canteen, setCanteen] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [groupedMenu, setGroupedMenu] = useState({});
    const [cart, setCart] = useState({});
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [canteenId]);

    const fetchData = async () => {
        try {
            const [canteenRes, menuRes] = await Promise.all([
                canteenAPI.getById(canteenId),
                menuAPI.getByCanteen(canteenId)
            ]);
            setCanteen(canteenRes.data.data);
            setMenuItems(menuRes.data.data);
            setGroupedMenu(menuRes.data.grouped);
        } catch (error) {
            toast.error('Failed to load menu');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (item) => {
        setCart(prev => ({
            ...prev,
            [item._id]: (prev[item._id] || 0) + 1
        }));
        toast.success(`Added ${item.name} to cart`, { duration: 1000 });
    };

    const removeFromCart = (item) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[item._id] > 1) {
                newCart[item._id]--;
            } else {
                delete newCart[item._id];
            }
            return newCart;
        });
    };

    const getCartTotal = () => {
        return Object.entries(cart).reduce((total, [itemId, quantity]) => {
            const item = menuItems.find(m => m._id === itemId);
            return total + (item?.price || 0) * quantity;
        }, 0);
    };

    const getCartCount = () => {
        return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    };

    const handleProceedToSlot = () => {
        if (getCartCount() === 0) {
            toast.error('Please add items to cart first');
            return;
        }

        // Store cart in sessionStorage for next page
        const cartItems = Object.entries(cart).map(([itemId, quantity]) => {
            const item = menuItems.find(m => m._id === itemId);
            return {
                menuItemId: itemId,
                name: item.name,
                quantity,
                price: item.price,
                prepTime: item.prepTime
            };
        });
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
        sessionStorage.setItem('cartTotal', getCartTotal().toString());

        navigate(`/time-slot/${canteenId}`);
    };

    const categories = ['All', ...Object.keys(groupedMenu)];

    const displayedItems = activeCategory === 'All'
        ? menuItems
        : groupedMenu[activeCategory] || [];

    if (loading) return <PageLoader />;

    return (
        <div className="min-h-screen pb-32">
            {/* Header */}
            <div className="bg-gradient-to-b from-dark-900 to-transparent py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <Link
                        to="/canteens"
                        className="inline-flex items-center space-x-2 text-dark-400 hover:text-white mb-6 transition-colors"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        <span>Back to Canteens</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{canteen?.name}</h1>
                            <p className="text-dark-400">{canteen?.location}</p>
                        </div>

                        <Link
                            to={`/cancelled-items/${canteenId}`}
                            className="mt-4 md:mt-0 btn-secondary inline-flex items-center space-x-2"
                        >
                            <FiTag className="w-4 h-4" />
                            <span>Available Now (Discounted)</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="sticky top-16 z-40 bg-dark-900/90 backdrop-blur-sm py-4 px-4 sm:px-6 lg:px-8 border-b border-dark-700">
                <div className="max-w-7xl mx-auto">
                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === category
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-dark-700 text-dark-300 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayedItems.map(item => (
                        <MenuItem
                            key={item._id}
                            item={item}
                            quantity={cart[item._id] || 0}
                            onAdd={addToCart}
                            onRemove={removeFromCart}
                        />
                    ))}
                </div>

                {displayedItems.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🍽️</div>
                        <p className="text-dark-400">No items available in this category</p>
                    </div>
                )}
            </div>

            {/* Cart Bar */}
            {getCartCount() > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 p-4 z-50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <FiShoppingCart className="w-6 h-6 text-primary-400" />
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-dark-400">{getCartCount()} items</p>
                                <p className="text-lg font-bold text-white">₹{getCartTotal()}</p>
                            </div>
                        </div>

                        <Button variant="primary" onClick={handleProceedToSlot}>
                            <FiClock className="w-4 h-4 mr-2" />
                            Select Pickup Time
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuPage;
