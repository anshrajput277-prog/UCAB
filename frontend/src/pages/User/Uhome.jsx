import Unav from './Unav';
import { useNavigate } from 'react-router-dom';
import rideBanner from "../../assets/EnjoyYourRide.png"

const Uhome = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen font-sans selection:bg-accent selection:text-gray-900 overflow-x-hidden flex flex-col">
            <Unav />
            
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 border-b border-gray-100 flex-1 flex flex-col justify-center">
                {/* Background Shapes */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 z-0 pointer-events-none">
                    <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/20 to-brand-300/20 blur-3xl opacity-60 animate-pulse-slow"></div>
                </div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 z-0 pointer-events-none">
                    <div className="w-[600px] h-[600px] rounded-full bg-brand-200/30 blur-3xl opacity-60"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-brand-100 to-amber-100 text-brand-800 text-sm font-bold tracking-wider mb-6 shadow-sm border border-brand-200/50 animate-slide-up">✦ YOUR PORTAL</span>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6 drop-shadow-sm animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-accent-dark to-brand-800 drop-shadow-sm">Ucab</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed font-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Cab Booking is the ultimate solution for all your transportation needs. Whether you're looking for a convenient ride to work, a hassle-free airport transfer, or a safe and reliable ride around town, our app has you covered.
                    </p>

                    {/* Banner Illustration inside Glass Card */}
                    <div className="glass-card bg-white/70 max-w-5xl mx-auto p-4 lg:p-6 mb-12 transform transition-all hover:shadow-2xl hover:-translate-y-2 duration-500 rounded-[2rem] border-white/50 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="rounded-2xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-2xl pointer-events-none"></div>
                            <img
                                src={rideBanner}
                                alt="Enjoy Your Ride Steps"
                                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <button
                            className="bg-brand-900 hover:bg-black text-white text-lg font-bold rounded-xl px-10 py-4 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center group overflow-hidden relative"
                            onClick={() => { navigate('/cabs') }}
                        >
                            <span className="relative z-10 flex items-center">
                                Book a Ride Now
                                <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                             <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        </button>
                    </div>
                </div>
            </section>

            {/* Feature Split Section */}
            <section className="py-20 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="mb-10 lg:mb-0 relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-accent-light to-brand-200 rounded-[2.5rem] blur-lg opacity-40 group-hover:opacity-60 transition duration-500"></div>
                            <img
                                src='https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=698&h=465&fit=crop&auto=format'
                                alt="Reserve a Ride"
                                className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px] transform group-hover:-translate-y-2 transition duration-500"
                            />
                        </div>
                        <div className="text-center lg:text-left">
                            <span className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3 block">Advance Booking</span>
                            <h2 className="text-4xl lg:text-5xl text-gray-900 font-extrabold font-display leading-tight mb-6">
                                Reserve a ride that's ready when you are
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium mb-8">
                                Now more than ever, reservations are a way of life. Reserve a premium Ucab experience, up to 90 days in advance, for whenever you’re ready to ride.
                            </p>
                            <button
                                className="btn-secondary group"
                                onClick={() => { navigate('/cabs') }}
                            >
                                Learn More
                                <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gray-50 border-t border-brand-50 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                         <span className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3 block">Features</span>
                        <h2 className="text-4xl text-gray-900 font-extrabold font-display">
                            Why use the Ucab app?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 hover:-translate-y-3 transition-all duration-500 group">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-100 to-amber-100 rounded-2xl flex items-center justify-center mb-6 text-brand-700 transform group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-gray-900 text-2xl font-bold font-display mb-4">Rides on demand</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Request a ride at any time and on any day of the year. We're always available.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 hover:-translate-y-3 transition-all duration-500 group">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-100 to-amber-100 rounded-2xl flex items-center justify-center mb-6 text-brand-700 transform group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-gray-900 text-2xl font-bold font-display mb-4">Budget-friendly</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Compare prices on every kind of ride, from daily commutes to special evenings out.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 hover:-translate-y-3 transition-all duration-500 group">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-100 to-amber-100 rounded-2xl flex items-center justify-center mb-6 text-brand-700 transform group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <h3 className="text-gray-900 text-2xl font-bold font-display mb-4">Easy to get around</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Just tap and let your driver take you exactly where you want to go.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="bg-brand-900 text-gray-300 py-16 mt-auto border-t-[8px] border-accent relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 pointer-events-none">
                    <div className="w-96 h-96 rounded-full bg-accent blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <h3 className="text-xl font-bold text-white font-display mb-6 flexItems-center">
                                <span className="w-8 h-8 bg-accent rounded-lg inline-flex items-center justify-center text-brand-900 mr-2">U</span>
                                Contact Us
                            </h3>
                            <ul className="space-y-3 font-medium">
                                <li className="flex items-center hover:text-accent transition-colors cursor-pointer">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    support@ucab.com
                                </li>
                                <li className="flex items-center hover:text-accent transition-colors cursor-pointer">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    +1-123-456-7890
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white font-display mb-6">Explore</h3>
                            <ul className="space-y-3 font-medium">
                                <li><a href="#" className="hover:text-amber-400 transition-colors pointer-events-none">About Us</a></li>
                                <li><a href="#" className="hover:text-amber-400 transition-colors pointer-events-none">Careers</a></li>
                                <li><a href="#" className="hover:text-amber-400 transition-colors pointer-events-none">Driver Portal</a></li>
                            </ul>
                        </div>
                        <div>
                           <h3 className="text-xl font-bold text-white font-display mb-6">Legal</h3>
                            <ul className="space-y-3 font-medium">
                                <li><a href="#" className="hover:text-amber-400 transition-colors pointer-events-none">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-amber-400 transition-colors pointer-events-none">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-amber-400 transition-colors pointer-events-none">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-brand-800 text-center md:flex md:justify-between md:items-center">
                        <p className="font-medium text-brand-400 mb-4 md:mb-0">
                            Ucab App — Your Trusted Transportation Partner
                        </p>
                        <p className="text-sm">
                            Copyright © {new Date().getFullYear()} - All rights reserved
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Uhome;
