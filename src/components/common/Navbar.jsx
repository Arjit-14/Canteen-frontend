import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiShoppingBag, FiLogOut, FiUser, FiGrid } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-md border-b border-red-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/canteens" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center group-hover:animate-pulse-red transition-all">
                            <HiOutlineSparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-stranger text-xl tracking-wide gradient-text">CANTEEN RUSH</span>
                            <span className="font-stranger text-xl tracking-wide text-gray-500"> AI</span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-2">
                        <Link
                            to="/canteens"
                            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                            <FiHome className="w-5 h-5" />
                            <span className="hidden sm:inline">Canteens</span>
                        </Link>

                        {user?.role === 'student' && (
                            <Link
                                to="/my-orders"
                                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            >
                                <FiShoppingBag className="w-5 h-5" />
                                <span className="hidden sm:inline">My Orders</span>
                            </Link>
                        )}

                        {user?.role === 'vendor' && (
                            <Link
                                to={`/vendor/dashboard/main`}
                                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            >
                                <FiGrid className="w-5 h-5" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                        )}

                        {/* User menu */}
                        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-red-900/30">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                                    <FiUser className="w-4 h-4 text-red-400" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium text-white">{user?.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                title="Logout"
                            >
                                <FiLogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
