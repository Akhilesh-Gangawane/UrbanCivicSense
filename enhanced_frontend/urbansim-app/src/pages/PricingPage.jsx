import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

export default function PricingPage() {
    return (
        <MainLayout>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-text-main-light dark:text-text-main-dark">
                        Plans for every city, <br className="hidden md:block" />
                        <span className="text-primary">big or small.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
                        Streamline civic issue redressal with AI-powered automation. Choose the plan that fits your municipality's needs.
                    </p>
                    <div className="mt-8 flex justify-center items-center gap-3">
                        <span className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">Monthly</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform"></span>
                        </button>
                        <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark flex items-center gap-1">
                            Yearly <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">Save 20%</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Free Plan */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Free</h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2">For Small Municipalities getting started.</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-text-main-light dark:text-text-main-dark">$0</span>
                            <span className="text-text-muted-light dark:text-text-muted-dark">/mo</span>
                        </div>
                        <Link to="/signup" className="block w-full py-3 px-4 bg-transparent border-2 border-primary text-primary font-semibold text-center rounded-lg hover:bg-primary hover:text-white transition-colors mb-8">
                            Start for Free
                        </Link>
                        <div className="space-y-4 flex-grow">
                            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mb-4">Core Features</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span className="material-icons-round text-primary text-lg">check_circle</span>
                                    <span>Up to 1,000 issue reports/mo</span>
                                </li>
                                {/* ... more items ... */}
                                <li className="flex items-start gap-3 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span className="material-icons-round text-primary text-lg">check_circle</span>
                                    <span>Basic AI categorization</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Professional Plan */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border-2 border-primary p-8 shadow-xl relative overflow-hidden h-full flex flex-col transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            POPULAR
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Professional</h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2">For Growing Cities needing efficiency.</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-text-main-light dark:text-text-main-dark">$499</span>
                            <span className="text-text-muted-light dark:text-text-muted-dark">/mo</span>
                        </div>
                        <Link to="/signup" className="block w-full py-3 px-4 bg-primary text-white font-semibold text-center rounded-lg hover:bg-opacity-90 shadow-lg shadow-primary/30 transition-all mb-8">
                            Get Started
                        </Link>
                        <div className="space-y-4 flex-grow">
                            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mb-4">Everything in Free, plus:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span className="material-icons-round text-primary text-lg">check_circle</span>
                                    <span>Up to 50,000 issue reports/mo</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span className="material-icons-round text-primary text-lg">check_circle</span>
                                    <span>Advanced AI triaging & routing</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Enterprise</h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2">For Metropolitan Areas requiring scale.</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-text-main-light dark:text-text-main-dark">Custom</span>
                        </div>
                        <Link to="/contact" className="block w-full py-3 px-4 bg-transparent border-2 border-text-muted-light dark:border-text-muted-dark text-text-main-light dark:text-text-main-dark font-semibold text-center rounded-lg hover:border-primary hover:text-primary transition-colors mb-8">
                            Contact Sales
                        </Link>
                        <div className="space-y-4 flex-grow">
                            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mb-4">Everything in Professional, plus:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span className="material-icons-round text-primary text-lg">check_circle</span>
                                    <span>Unlimited issue reports</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span className="material-icons-round text-primary text-lg">check_circle</span>
                                    <span>Predictive AI Maintenance Models</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}
