import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { HiOutlineSparkles } from 'react-icons/hi';
import { FiMail, FiLock, FiUser, FiPhone, FiHash, FiBookOpen, FiArrowLeft } from 'react-icons/fi';
import Button from '../components/common/Button';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        studentId: '',
        department: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                toast.success('Welcome back!');
            } else {
                await register(formData);
                toast.success('Account created successfully!');
            }
            navigate('/canteens');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-pink/5 rounded-full blur-3xl" />
            </div>

            {/* Back to home link */}
            <Link
                to="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
            >
                <FiArrowLeft className="w-5 h-5" />
                <span>Back</span>
            </Link>

            <div className="relative w-full max-w-md z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl mb-4 animate-glow">
                        <HiOutlineSparkles className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="font-stranger text-4xl tracking-wide">
                        <span className="gradient-text animate-flicker">CANTEEN RUSH</span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-retro">Enter The Portal</p>
                </div>

                {/* Form Card */}
                <div className="card p-8">
                    {/* Tabs */}
                    <div className="flex mb-6 bg-dark-700 rounded-xl p-1">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${isLogin
                                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30'
                                : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${!isLogin
                                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30'
                                : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="John Doe"
                                            required={!isLogin}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Student ID</label>
                                        <div className="relative">
                                            <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                            <input
                                                type="text"
                                                name="studentId"
                                                value={formData.studentId}
                                                onChange={handleChange}
                                                className="input"
                                                placeholder="STU2024001"
                                                required={!isLogin}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Department</label>
                                        <div className="relative">
                                            <FiBookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                            <input
                                                type="text"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                                className="input"
                                                placeholder="CSE"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="+91-9876543210"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="john@university.edu"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full mt-6"
                            loading={loading}
                        >
                            {isLogin ? 'Enter The Portal' : 'Create Account'}
                        </Button>
                    </form>

                    {/* Demo credentials */}
                    <div className="mt-6 p-4 bg-dark-700/50 rounded-xl border border-red-900/30">
                        <p className="text-xs text-gray-500 text-center mb-2 font-stranger tracking-wide">DEMO CREDENTIALS</p>
                        <div className="text-xs text-gray-400 space-y-1">
                            <p><strong className="text-red-500">Student:</strong> john@university.edu / password123</p>
                            <p><strong className="text-red-500">Vendor:</strong> vendor@canteen.edu / vendor123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
