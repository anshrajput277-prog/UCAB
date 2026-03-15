import { useState } from "react";
import NavBar from "./Navbar";
import cabIllustration from "../assets/cab-illustration.png";
import premiumAppImg from "../assets/EnjoyYourRide.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [estimate, setEstimate] = useState(null);
  const navigate = useNavigate();

  const handleEstimate = (e) => {
    e.preventDefault();
    if (pickup && dropoff) {
      // Mock calculation based on length of strings (just for visual effect)
      const mockDistance = Math.abs(pickup.length - dropoff.length) + 5;
      const calculatedFare = (2 + (1.5 * mockDistance)).toFixed(2);
      setEstimate(calculatedFare);
    }
  };

  const handleBookNow = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-accent selection:text-gray-900 overflow-x-hidden">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex-1 flex items-center">
        {/* Animated Background shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 z-0">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/30 to-brand-300/20 blur-3xl opacity-60 animate-pulse-slow"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 z-0">
          <div className="w-[800px] h-[800px] rounded-full bg-brand-200/40 blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Column: Copy & Widget */}
            <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0 animate-slide-up">
              <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-brand-100 to-amber-100 text-brand-800 text-sm font-bold tracking-wider mb-6 shadow-sm border border-brand-200/50">✦ RELIABLE & FAST</span>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6 drop-shadow-sm">
                Your Ride,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-accent-dark to-brand-800 drop-shadow-sm">Your Way</span>
              </h1>
              <p className="max-w-xl mx-auto lg:mx-0 text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                Connect with professional drivers instantly. Book cabs anytime, anywhere, and track your journey in real-time.
              </p>

              {/* Fare Estimator Widget */}
              <div className="glass-card bg-white/60 max-w-lg mx-auto lg:mx-0 p-8 transform transition-all hover:shadow-2xl hover:-translate-y-2 duration-500 relative overflow-hidden group border border-white/40 ring-1 ring-black/5">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-brand-600 transition-all duration-300 group-hover:w-2.5"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-accent/20 p-2 rounded-lg mr-3 text-brand-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </span>
                  Estimate Fare
                </h3>
                <form onSubmit={handleEstimate} className="space-y-5">
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm transition-transform group-hover/input:scale-110"></div>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Pickup Location" 
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="input-premium pl-12 bg-white/80 focus:bg-white w-full"
                      required
                    />
                  </div>
                  
                  <div className="relative group/input">
                    <div className="absolute -top-4 left-[1.125rem] w-0.5 h-8 bg-gradient-to-b from-green-500/50 to-brand-600/50"></div>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div className="w-3.5 h-3.5 rounded-sm bg-brand-600 border-2 border-white shadow-sm transition-transform group-hover/input:scale-110 rotate-45"></div>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Dropoff Destination" 
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="input-premium pl-12 bg-white/80 focus:bg-white w-full"
                      required
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button type="submit" className="text-brand-700 font-bold hover:text-brand-900 hover:underline underline-offset-4 transition-all flex items-center">
                      Calculate
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </button>
                    {estimate && (
                      <div className="text-right animate-fade-in bg-white/80 px-4 py-2 rounded-xl shadow-sm border border-brand-100">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Estimated Fare</span>
                        <span className="text-2xl font-extrabold text-brand-700">${estimate}</span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={handleBookNow}
                    className="w-full btn-primary mt-6 py-4 text-lg font-bold group/btn overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Set Pickup & Book
                      <svg className="w-5 h-5 ml-2 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Illustration/Image */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full max-w-2xl px-4 sm:px-0 mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 to-brand-400/30 rounded-[3rem] transform rotate-3 scale-105 -z-10 blur-xl transition-all duration-700 hover:rotate-6 hover:scale-110"></div>
                <img
                  src={cabIllustration}
                  alt="Premium Cab Service"
                  className="w-full h-auto drop-shadow-2xl relative z-10 transform transition-all duration-700 hover:scale-[1.03]"
                />
                
                {/* Floating Meta tags */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl flex items-center space-x-4 z-20 animate-slide-up shadow-2xl border-white/50" style={{ animationDelay: '0.4s' }}>
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-inner">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 font-display tracking-tight text-lg">24/7 Available</div>
                    <div className="text-sm font-medium text-gray-500">Premium Support</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white relative z-10 border-t border-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3">Simple Process</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-gray-900 font-display">How It Works</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[5rem] left-[20%] right-[20%] h-1 bg-gradient-to-r from-brand-100 via-accent to-brand-100 -z-1 rounded-full opacity-50"></div>

            {/* Step 1 */}
            <div className="relative bg-white pt-10 px-8 pb-12 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 text-center group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform shadow-inner text-brand-600 relative z-10">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent rounded-full border-4 border-white flex items-center justify-center font-bold text-xl text-brand-900 shadow-md">1</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 font-display">Set Location</h4>
              <p className="text-gray-500 leading-relaxed font-medium">Enter your pickup point and destination to see estimated fares immediately.</p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white pt-10 px-8 pb-12 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 text-center group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl flex items-center justify-center mb-8 transform group-hover:-rotate-6 transition-transform shadow-inner text-brand-600 relative z-10">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent flex items-center justify-center font-bold text-xl text-brand-900 border-4 border-white rounded-full shadow-md">2</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 font-display">Choose Your Ride</h4>
              <p className="text-gray-500 leading-relaxed font-medium">Select from our premium fleet of vehicles that best suits your needs and budget.</p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white pt-10 px-8 pb-12 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 text-center group">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform shadow-inner text-brand-600 relative z-10">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent flex items-center justify-center font-bold text-xl text-brand-900 border-4 border-white rounded-full shadow-md">3</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4 font-display">Enjoy the Journey</h4>
              <p className="text-gray-500 leading-relaxed font-medium">Sit back and relax while our verified professional drivers take you safely to your destination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="py-24 bg-gray-50 relative z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-200/40 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <span className="inline-block py-1 px-4 rounded-full bg-brand-100 text-brand-800 text-sm font-bold tracking-widest uppercase mb-4 shadow-sm">Why Choose Us</span>
            <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 font-display tracking-tight mb-6">Experience the Difference</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-500 font-medium">We've thought of everything to make your journey perfect. Discover the features that make Ucab the top choice for millions.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Safety First",
                desc: "Every ride is tracked in real-time. Share your trip status and ride securely with verified pros.",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              },
              {
                title: "Premium Fleet",
                desc: "From sleek sedans to spacious SUVs, choose a premium, meticulously maintained vehicle.",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 17l.867 12.142A2 2 0 0117.83 31H6.17a2 2 0 01-1.993-2.142L5 17m5 4v-4m4 4v-4m-9 0a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4z" transform="translate(0, -10)"/></svg>
              },
              {
                title: "Fair Pricing",
                desc: "No hidden fees. What you see is exactly what you pay. Transparent pricing, always.",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              },
              {
                title: "24/7 Support",
                desc: "Our dedicated support team is available around the clock to assist you with anything.",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              }
            ].map((feature, idx) => (
              <div key={idx} className="glass-card bg-white/70 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-white group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-white to-brand-50 rounded-2xl shadow-sm border border-brand-100 flex items-center justify-center text-accent-dark mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
            {/* Visual Side */}
            <div className="mb-16 lg:mb-0 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-200 to-accent rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition duration-700"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white p-2">
                <img
                  src={premiumAppImg}
                  alt="Ucab Premium Experience"
                  className="w-full h-[500px] object-cover rounded-[2rem] transform group-hover:scale-105 transition-transform duration-700 filter brightness-105"
                  onError={(e) => {
                    // Fallback to illustration if image doesn't exist
                    e.target.src = cabIllustration;
                  }}
                />
                <div className="absolute bottom-10 left-10 right-10 glass-card bg-white/80 p-6 rounded-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 border border-white/50">
                  <p className="text-gray-900 font-bold text-lg">"The best cab service I've ever experienced. Clean, fast, and incredibly reliable."</p>
                  <p className="text-brand-600 font-semibold mt-2 text-sm uppercase tracking-wider">— Verified Passenger</p>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:pl-8">
              <span className="inline-block py-1 px-4 rounded-full bg-brand-100 text-brand-800 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">Our Mission</span>
              <h2 className="text-4xl lg:text-6xl text-gray-900 font-extrabold font-display leading-[1.15] mb-8 tracking-tight">
                Redefining modern transportation, <span className="text-brand-600">one ride at a time.</span>
              </h2>
              <div className="space-y-6 text-xl text-gray-500 font-medium leading-relaxed">
                <p>
                  Ucab was founded on a simple premise: transportation should be seamless, safe, and sophisticated. We aren't just getting you from point A to point B; we're transforming how you experience the journey.
                </p>
                <p>
                  By partnering only with top-tier professional drivers and maintaining the highest standards for our vehicle network, we ensure that every time you open our app, you're guaranteed a premium experience.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-gray-100 pt-10 mt-10">
                <div>
                  <div className="text-4xl font-extrabold text-gray-900 mb-2 font-display">2M+</div>
                  <div className="text-sm font-bold text-brand-600 uppercase tracking-wider">Completed Rides</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-gray-900 mb-2 font-display">99.8%</div>
                  <div className="text-sm font-bold text-brand-600 uppercase tracking-wider">Happy Customers</div>
                </div>
              </div>
              
              <div className="mt-12">
                <button 
                  onClick={handleBookNow}
                  className="btn-primary"
                >
                  Join Ucab Today
                  <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-brand-900 py-12 z-10 relative mt-auto border-t-[8px] border-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center text-brand-200 gap-8">
          <div className="flex items-center space-x-4 font-display font-medium text-lg lg:text-xl group cursor-default">
            <div className="p-3 bg-brand-800 rounded-xl group-hover:bg-accent group-hover:-translate-y-1 transition-all">
              <svg className="w-7 h-7 group-hover:text-brand-900 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <span className="group-hover:text-white transition-colors">Verified Drivers</span>
          </div>
          <div className="flex items-center space-x-4 font-display font-medium text-lg lg:text-xl group cursor-default">
            <div className="p-3 bg-brand-800 rounded-xl group-hover:bg-accent group-hover:-translate-y-1 transition-all">
              <svg className="w-7 h-7 group-hover:text-brand-900 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg>
            </div>
            <span className="group-hover:text-white transition-colors">Top Rated Rides</span>
          </div>
          <div className="flex items-center space-x-4 font-display font-medium text-lg lg:text-xl group cursor-default">
            <div className="p-3 bg-brand-800 rounded-xl group-hover:bg-accent group-hover:-translate-y-1 transition-all">
              <svg className="w-7 h-7 group-hover:text-brand-900 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            </div>
            <span className="group-hover:text-white transition-colors">Secure Payments</span>
          </div>
          <div className="flex items-center space-x-4 font-display font-medium text-lg lg:text-xl group cursor-default">
            <div className="p-3 bg-brand-800 rounded-xl group-hover:bg-accent group-hover:-translate-y-1 transition-all">
              <svg className="w-7 h-7 group-hover:text-brand-900 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.71L11 12.41V7h2v4.59l3.71 3.71-1.42 1.41z"/></svg>
            </div>
            <span className="group-hover:text-white transition-colors">Zero Wait Time</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
