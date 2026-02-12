import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

export default function LandingPage() {
    return (
        <MainLayout>
            <header className="relative pt-12 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-6">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span>New: AI Pothole Detection v2.0</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-text-main-light dark:text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">AI-Powered</span> Urban Issue Redressal for Smart Cities
                    </h1>
                    <p className="text-lg md:text-xl text-text-muted-light dark:text-text-muted-dark mb-8 max-w-2xl mx-auto">
                        Empower citizens to report issues instantly. Enable municipalities to solve them efficiently with automated workflows and smart routing.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/report-issue" className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition transform hover:-translate-y-1 block text-center">
                            Start Reporting
                        </Link>
                        <button className="w-full sm:w-auto bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-main-light dark:text-text-main-dark px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center justify-center gap-2">
                            <span className="material-icons-round text-primary">play_circle</span>
                            Watch Demo
                        </button>
                    </div>
                </div>

                <div className="mt-16 relative mx-auto max-w-5xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center space-x-2 bg-gray-50 dark:bg-gray-800/50">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="p-6 md:p-10 flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] bg-white dark:bg-slate-900 overflow-x-auto">
                            <div className="flex items-center space-x-4 min-w-[600px]">
                                <div className="flex flex-col items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm w-40">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mb-2">
                                        <span className="material-icons-round text-blue-600 dark:text-blue-400">add_a_photo</span>
                                    </div>
                                    <span className="font-semibold text-sm">New Report</span>
                                    <span className="text-xs text-gray-500">Citizen App</span>
                                </div>
                                <div className="h-0.5 w-12 bg-gray-300 dark:bg-gray-600"></div>
                                <div className="flex flex-col items-center bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-primary shadow-glow w-48 relative">
                                    <div className="absolute -top-3 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">AI Processing</div>
                                    <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg mb-2">
                                        <span className="material-icons-round text-primary">auto_fix_high</span>
                                    </div>
                                    <span className="font-semibold text-sm">Classify Issue</span>
                                    <span className="text-xs text-gray-500">Computer Vision</span>
                                </div>
                                <div className="h-0.5 w-12 bg-gray-300 dark:bg-gray-600"></div>
                                <div className="flex flex-col items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm w-40">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mb-2">
                                        <span className="material-icons-round text-green-600 dark:text-green-400">alt_route</span>
                                    </div>
                                    <span className="font-semibold text-sm">Route to Dept</span>
                                    <span className="text-xs text-gray-500">Public Works</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="py-10 border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900/50">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest mb-6">Trusted by forward-thinking cities</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 font-bold text-xl"><span className="material-icons-round">apartment</span> CityFlow</div>
                        <div className="flex items-center gap-2 font-bold text-xl"><span className="material-icons-round">location_city</span> MetroTech</div>
                        <div className="flex items-center gap-2 font-bold text-xl"><span className="material-icons-round">public</span> UrbanGrid</div>
                        <div className="flex items-center gap-2 font-bold text-xl"><span className="material-icons-round">map</span> CivicOps</div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 max-w-6xl mx-auto space-y-24">
                {/* Feature 1 */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-soft">
                    <div className="flex items-center space-x-3 mb-6">
                        <span className="material-icons-round text-primary text-2xl">psychology</span>
                        <span className="font-bold text-lg text-text-muted-light dark:text-text-muted-dark">AI Classification</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-4 text-text-main-light dark:text-white">Automatically identify & prioritize issues.</h3>
                            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-6">
                                No more manual sorting. Our computer vision models instantly categorize photos of potholes, broken lights, and garbage dumps with 99% accuracy.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="material-icons-round text-green-500">check_circle</span>
                                    <span>Real-time image analysis</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-icons-round text-green-500">check_circle</span>
                                    <span>Severity assessment scoring</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-icons-round text-green-500">check_circle</span>
                                    <span>Duplicate report detection</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-background-light dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            <img alt="Pothole detection visual" className="rounded-lg mb-4 opacity-80 w-full h-48 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaNWIWq2FxL63VhOm72B_NHK4N7nJfvjPLmb9vsZenQmEfGB4jQI-6zEaXdvzZfKzfXW-N-Js1rU2DmcEoKhyYWfLaNs2aYuZGomPOkG_PUT0aCcLTNLUBVVesKbRMiVQkoXfhNDe9neKIc_cwGKUgnbKTlUFRED97qtnTQyDNbxtHAmijfGeIaVad7HYEKFiJWxJZQh639pv0AfvN9ip0bUpZYkJXgXaAjqASjK_uO9TX3BZ6FH_4t7P9ZzoblCE-n7sKoecQf1Y" />
                            <div className="absolute bottom-10 left-10 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border-l-4 border-primary flex items-center gap-3 max-w-xs animate-bounce">
                                <span className="material-icons-round text-primary">warning</span>
                                <div>
                                    <div className="text-xs font-bold uppercase text-gray-500">Detected</div>
                                    <div className="font-semibold text-sm">Pothole (High Priority)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-soft">
                    <div className="flex items-center space-x-3 mb-6">
                        <span className="material-icons-round text-primary text-2xl">hub</span>
                        <span className="font-bold text-lg text-text-muted-light dark:text-text-muted-dark">Smart Routing</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 bg-background-light dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700 flex justify-center">
                            <div className="relative w-full max-w-md h-64">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 rounded-full"></div>
                                <div className="absolute top-1/2 left-10 -translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 z-10 w-32 text-center">
                                    <span className="text-xs font-bold block text-gray-500">Input</span>
                                    <span className="text-sm font-semibold">Report #1024</span>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-full shadow-lg shadow-primary/40 z-20">
                                    <span className="material-icons-round">alt_route</span>
                                </div>
                                <div className="absolute top-10 right-10 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 z-10 w-32 text-center">
                                    <span className="text-xs font-bold block text-blue-500">Sanitation</span>
                                    <span className="text-sm font-semibold">Dispatched</span>
                                </div>
                                <div className="absolute bottom-10 right-10 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 z-10 w-32 text-center opacity-50">
                                    <span className="text-xs font-bold block text-gray-500">Roads</span>
                                    <span className="text-sm font-semibold">Skipped</span>
                                </div>
                                <div className="absolute top-1/2 left-1/2 w-24 h-24 border-t-2 border-r-2 border-dashed border-primary rounded-tr-3xl -translate-y-full ml-2"></div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h3 className="text-3xl font-bold mb-4 text-text-main-light dark:text-white">Route tasks to the right department, instantly.</h3>
                            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-6">
                                UrbanSim connects directly to your existing workforce management tools. Issues are routed based on location, type, and team availability.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="material-icons-round text-primary">check_circle</span>
                                    <span>Integrates with 500+ tools</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-icons-round text-primary">check_circle</span>
                                    <span>Location-based assignment</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-icons-round text-primary">check_circle</span>
                                    <span>SLA monitoring & alerts</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile App Section */}
            <section className="py-20 bg-primary/5 dark:bg-primary/10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2 space-y-8">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-text-main-light dark:text-white leading-tight">From Report to <span className="text-primary">Resolution</span></h2>
                            <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                                The UrbanSim mobile app gives citizens the power to improve their neighborhood, and gives field workers the context they need to fix it fast.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md flex-shrink-0 text-primary">
                                        <span className="material-icons-round">touch_app</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">One-Tap Reporting</h4>
                                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Simply snap a photo. AI handles the description and location tagging.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md flex-shrink-0 text-primary">
                                        <span className="material-icons-round">notifications_active</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Live Status Updates</h4>
                                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Get notified when your issue is received, scheduled, and fixed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Phone Mockup */}
                        <div className="w-full md:w-1/2 flex justify-center relative">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full transform translate-y-10"></div>
                            <div className="relative w-72 h-[580px] bg-black rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden z-10">
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
                                <div className="w-full h-full bg-surface-light dark:bg-slate-900 overflow-hidden flex flex-col">
                                    {/* App Header */}
                                    <div className="bg-primary pt-10 pb-4 px-4 text-white">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold">My Reports</span>
                                            <span className="material-icons-round text-sm">settings</span>
                                        </div>
                                    </div>
                                    {/* App Body */}
                                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                                        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Resolved</span>
                                                <span className="text-xs text-gray-400">2h ago</span>
                                            </div>
                                            <h5 className="font-bold text-sm mb-1">Street Light Outage</h5>
                                            <p className="text-xs text-gray-500 mb-2">4th Avenue & Main St.</p>
                                            <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                                                <img alt="street light" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHzmD0h_d73m8brqI3GhDPJLwFiO0OKk62fKFYguqzOCoyKTZnmHtGGFrVaBJj91jJY90Tk6aXi4l8j3mmryEeMUQL0Gl29clL4RI9ApvQBKWmScaUVzu2i_piejNsD-MrB3G74YCbXEKsal-jpnIaD0JN682dUryctXnqeeqg17i0odpQKJZwnuaW0FOjwqRo4CIJ44OND3a6OEAPR_JGIRPE12H5CLA1q4wIYRTaYZ0b6L3eOt4CaFUxc17_TtWUX9z6koM_6yo" />
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded font-bold">In Progress</span>
                                                <span className="text-xs text-gray-400">1d ago</span>
                                            </div>
                                            <h5 className="font-bold text-sm mb-1">Graffiti on Wall</h5>
                                            <p className="text-xs text-gray-500 mb-2">Community Center Park</p>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary w-2/3"></div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* App Nav */}
                                    <div className="bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-gray-700 p-4 flex justify-around text-gray-400">
                                        <span className="material-icons-round text-primary">home</span>
                                        <span className="material-icons-round">map</span>
                                        <span className="material-icons-round">person</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations */}
            <section className="py-20 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4 text-text-main-light dark:text-white">Connects with your city's tech stack</h2>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-12 max-w-2xl mx-auto">UrbanSim plays nice with the tools your departments already use every day.</p>
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {/* Logic for integration items could be a map loop, keeping it static for now to match HTML */}
                    <div className="p-4 bg-white dark:bg-surface-dark shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-blue-500"></div>
                        <span className="font-semibold text-sm">Salesforce</span>
                    </div>
                    <div className="p-4 bg-white dark:bg-surface-dark shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-green-500"></div>
                        <span className="font-semibold text-sm">ServiceNow</span>
                    </div>
                    <div className="p-4 bg-white dark:bg-surface-dark shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-purple-500"></div>
                        <span className="font-semibold text-sm">Slack</span>
                    </div>
                    <div className="p-4 bg-white dark:bg-surface-dark shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-orange-500"></div>
                        <span className="font-semibold text-sm">ArcGIS</span>
                    </div>
                    <div className="p-4 bg-white dark:bg-surface-dark shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-sky-500"></div>
                        <span className="font-semibold text-sm">Microsoft Teams</span>
                    </div>
                    <div className="p-4 bg-white dark:bg-surface-dark shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-red-500"></div>
                        <span className="font-semibold text-sm">Gmail</span>
                    </div>
                </div>
                <button className="mt-10 text-primary font-semibold hover:text-primary-hover flex items-center justify-center gap-2 mx-auto">
                    Browse all 500+ integrations <span className="material-icons-round text-sm">arrow_forward</span>
                </button>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-surface-light dark:bg-surface-dark border-y border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 text-text-main-light dark:text-white">Real Cities. Real Results.</h2>
                        <p className="text-text-muted-light dark:text-text-muted-dark">See how municipalities are saving hours and improving citizen satisfaction.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-background-light dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 relative">
                            <span className="absolute top-8 right-8 text-primary text-4xl opacity-20 serif">"</span>
                            <div className="mb-6 flex items-center gap-3">
                                <img alt="Official" className="w-12 h-12 rounded-full border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6xW7j93U44W4JM7ZhB9OkSFsAINPy4P3-1mb5dw5GQf0e7EVNUjeky8RWdqbJZnF57tlqJCV4CbTXg6dYseMkIz8nhu7Jo0Igi0Xt-Uv-uaIP9Ar3Dq9Whv13-xSHCpzse6Q5FTvv0MbEoLOoila5lyaBBeaK6UgWtDod8PmwjpJMvnMKQn2QynC2gkyJhQVw-pVoBQtY-PKXBfOsgD1KkEsAGIsXPvd6QS9XWubzdvHpfb1qpPBoj6HMDij8nL6Wvh7KdrTB7Ik" />
                                <div>
                                    <div className="font-bold text-sm">Mayor James Sterling</div>
                                    <div className="text-xs text-gray-500">City of Springfield</div>
                                </div>
                            </div>
                            <p className="text-text-muted-light dark:text-text-muted-dark italic">
                                "We reduced our response time by 40% in just three months. The automated routing means our crews know exactly where to go."
                            </p>
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-sm font-bold text-text-main-light dark:text-white">
                                <span className="material-icons-round text-primary text-base">trending_up</span> 40% Faster Resolution
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-background-light dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 relative">
                            <span className="absolute top-8 right-8 text-primary text-4xl opacity-20 serif">"</span>
                            <div className="mb-6 flex items-center gap-3">
                                <img alt="Official" className="w-12 h-12 rounded-full border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7GkdUAqZWYyBsghANepdA3yfm7tFdsg8K6Jq0OPikp7m5WPYctGDxi55GuVqT49pEXlFCo9AQX3YpejGojIBQEbT9-vGYz16NNX5BJoxWHWBzv2N_bqvVTPbx4GmlIO24-NV8PekuzclQSnsaENF_QzhzcE1CgQ9TTR7b-jwf2Y3mlNLRmA1Y0_wS-IBJGGqpDg7XCoH6a7772tboNwX-uXy4e_ELN7K-AhaWPcCwF5zgCajsAR8tt5a3bQgtE2806dLrR71kpnM" />
                                <div>
                                    <div className="font-bold text-sm">Sarah Jenkins</div>
                                    <div className="text-xs text-gray-500">Director of Public Works</div>
                                </div>
                            </div>
                            <p className="text-text-muted-light dark:text-text-muted-dark italic">
                                "The AI classification is a game changer. We used to spend hours just sorting through emails. Now it happens instantly."
                            </p>
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-sm font-bold text-text-main-light dark:text-white">
                                <span className="material-icons-round text-primary text-base">schedule</span> 200+ Man-hours Saved
                            </div>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="bg-background-light dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 relative">
                            <span className="absolute top-8 right-8 text-primary text-4xl opacity-20 serif">"</span>
                            <div className="mb-6 flex items-center gap-3">
                                <img alt="Citizen" className="w-12 h-12 rounded-full border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf6VpF1GPIioznchUqDInHjbHiLT-KbETWjUXaxd_jfctn714RtBbaYJ7mydxnBDnSjtq1Ldls_zlnpJdK5S85dwxpUpXNVpWho8vk0ZpzVZgkjfJPBlxNECp0ElMUPOKJFQilVsfDZMG4hKHuaXlbQGKMr0vop6-d2DpPWp3_K4rQ0trJqQILswAt4FDQx4Ws4bzvYdfm6F0EdECzTzeUKHIZt4yZSS2jYSXo7tGlEUnPNBZhYWnVFrQ0L_Nf2kUMcjgPbBrzaK4" />
                                <div>
                                    <div className="font-bold text-sm">David Chen</div>
                                    <div className="text-xs text-gray-500">Resident, District 9</div>
                                </div>
                            </div>
                            <p className="text-text-muted-light dark:text-text-muted-dark italic">
                                "I reported a pothole on my morning jog and it was fixed by the time I came home from work. Incredible transparency."
                            </p>
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-sm font-bold text-text-main-light dark:text-white">
                                <span className="material-icons-round text-primary text-base">sentiment_very_satisfied</span> 98% Satisfaction Score
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-text-main-light dark:bg-black z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-600/30 z-0"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Build a smarter city today.</h2>
                    <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">Join the network of municipalities transforming urban living through AI and automation.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/report-issue" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/40 transition">
                            Start Reporting
                        </Link>
                        <button className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition">
                            Contact Sales
                        </button>
                    </div>
                    <p className="mt-8 text-sm opacity-60">No credit card required for demo access.</p>
                </div>
            </section>
        </MainLayout>
    );
}
