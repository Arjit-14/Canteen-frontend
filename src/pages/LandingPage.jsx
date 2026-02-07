import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineClock, HiOutlineQrcode, HiOutlineLightningBolt } from 'react-icons/hi';
import { FiArrowRight, FiZap, FiClock, FiSmartphone } from 'react-icons/fi';

const LandingPage = () => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl animate-pulse-slow delay-500" />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <header className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
                {/* Logo */}
                <div className="mb-8 animate-float">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl animate-glow">
                        <HiOutlineSparkles className="w-12 h-12 text-white" />
                    </div>
                </div>

                {/* Title - Stranger Things Style */}
                <h1 className="hero-title animate-flicker mb-4">
                    CANTEEN RUSH
                </h1>
                <h2 className="font-stranger text-4xl md:text-6xl text-white mb-6 tracking-wider">
                    <span className="neon-text-blue">AI</span>
                </h2>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-4 font-retro">
                    The Upside Down of Campus Dining
                </p>
                <p className="text-lg text-gray-500 max-w-xl mb-12">
                    Skip the queue. Beat the rush. AI-powered pre-ordering that predicts the perfect pickup time.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <Link
                        to="/login"
                        className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4"
                    >
                        Enter The Portal
                        <FiArrowRight className="w-5 h-5" />
                    </Link>
                    <a
                        href="#features"
                        className="btn-secondary flex items-center justify-center gap-2 text-lg px-8 py-4"
                    >
                        Explore Features
                    </a>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-stranger text-red-500 neon-text">3+</div>
                        <div className="text-gray-500 text-sm">Canteens</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-stranger text-red-500 neon-text">50+</div>
                        <div className="text-gray-500 text-sm">Menu Items</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-stranger text-red-500 neon-text">5min</div>
                        <div className="text-gray-500 text-sm">Avg Wait Time</div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 animate-bounce">
                    <div className="w-6 h-10 border-2 border-red-500/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-pulse" />
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h3 className="font-stranger text-4xl md:text-5xl text-center text-white mb-4 tracking-wide">
                        <span className="gradient-text">SUPERNATURAL</span> FEATURES
                    </h3>
                    <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">
                        Powered by AI from the Upside Down to make your campus dining experience otherworldly
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1 */}
                        <div className="card p-6 card-hover group">
                            <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:animate-pulse-red">
                                <FiZap className="w-7 h-7 text-red-500" />
                            </div>
                            <h4 className="font-stranger text-xl text-white mb-2 tracking-wide">AI SCHEDULING</h4>
                            <p className="text-gray-500 text-sm">
                                Our AI predicts kitchen load and suggests optimal pickup times
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card p-6 card-hover group">
                            <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:animate-pulse-red">
                                <FiClock className="w-7 h-7 text-red-500" />
                            </div>
                            <h4 className="font-stranger text-xl text-white mb-2 tracking-wide">REAL-TIME UPDATES</h4>
                            <p className="text-gray-500 text-sm">
                                Live order tracking with WebSocket for instant status updates
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card p-6 card-hover group">
                            <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:animate-pulse-red">
                                <HiOutlineQrcode className="w-7 h-7 text-red-500" />
                            </div>
                            <h4 className="font-stranger text-xl text-white mb-2 tracking-wide">QR PICKUP</h4>
                            <p className="text-gray-500 text-sm">
                                Contactless collection with secure QR code verification
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="card p-6 card-hover group">
                            <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:animate-pulse-red">
                                <FiSmartphone className="w-7 h-7 text-red-500" />
                            </div>
                            <h4 className="font-stranger text-xl text-white mb-2 tracking-wide">MOBILE FIRST</h4>
                            <p className="text-gray-500 text-sm">
                                Responsive design that works perfectly on any device
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="relative z-10 py-20 px-4 bg-dark-900/50">
                <div className="max-w-4xl mx-auto">
                    <h3 className="font-stranger text-4xl md:text-5xl text-center text-white mb-16 tracking-wide">
                        HOW IT <span className="gradient-text">WORKS</span>
                    </h3>

                    <div className="space-y-8">
                        {[
                            { step: '01', title: 'CHOOSE YOUR CANTEEN', desc: 'Browse available canteens on campus' },
                            { step: '02', title: 'SELECT YOUR FOOD', desc: 'Pick items from the menu and add to cart' },
                            { step: '03', title: 'AI SUGGESTS TIME', desc: 'Our AI recommends the best pickup slot' },
                            { step: '04', title: 'COLLECT WITH QR', desc: 'Show your QR code and grab your order' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6 group">
                                <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center font-stranger text-2xl text-white group-hover:animate-glow transition-all">
                                    {item.step}
                                </div>
                                <div>
                                    <h4 className="font-stranger text-xl text-white tracking-wide">{item.title}</h4>
                                    <p className="text-gray-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="font-stranger text-4xl md:text-5xl text-white mb-6 tracking-wide">
                        READY TO <span className="gradient-text animate-flicker">ENTER</span>?
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-xl mx-auto">
                        Join thousands of students who have escaped the canteen queue.
                        The portal awaits.
                    </p>
                    <Link
                        to="/login"
                        className="btn-primary inline-flex items-center gap-2 text-xl px-10 py-5"
                    >
                        Get Started Now
                        <FiArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-8 px-4 border-t border-red-900/30">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <HiOutlineSparkles className="w-6 h-6 text-red-500" />
                        <span className="font-stranger text-xl text-white tracking-wide">CANTEEN RUSH AI</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Built for the Stranger Things Hackathon 2026
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
