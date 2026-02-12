import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminLayout({ children }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-sans transition-colors duration-200">

            <main className="flex-1 pb-24 relative">
                {children}
            </main>

            {/* Cloud Floating Bottom Nav (Admin Style) */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#0B0A12]/90 border-t border-gray-200 dark:border-white/5 backdrop-blur-lg pb-safe pt-2 px-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)] z-50">
                <div className="max-w-md mx-auto flex justify-between items-center h-16">
                    <Link to="/admin/dashboard" className={`flex flex-col items-center gap-1 group w-16 ${isActive('/admin/dashboard') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                        <span className="material-icons-round text-2xl">dashboard</span>
                        <span className="text-[10px] font-medium">Overview</span>
                    </Link>
                    <Link to="/admin/map" className={`flex flex-col items-center gap-1 group w-16 ${isActive('/admin/map') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                        <span className="material-icons-round text-2xl">map</span>
                        <span className="text-[10px] font-medium">Map</span>
                    </Link>
                    <div className="relative -top-6">
                        <button className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg shadow-orange-500/30 transition-all transform hover:scale-105 flex items-center justify-center">
                            <span className="material-icons-round text-2xl">add</span>
                        </button>
                    </div>
                    <Link to="/admin/performance" className={`flex flex-col items-center gap-1 group w-16 ${isActive('/admin/performance') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                        <span className="material-icons-round text-2xl">insights</span>
                        <span className="text-[10px] font-medium">Trends</span>
                    </Link>
                    <Link to="/admin/insights" className={`flex flex-col items-center gap-1 group w-16 ${isActive('/admin/insights') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                        <span className="material-icons-round text-2xl">analytics</span>
                        <span className="text-[10px] font-medium">AI</span>
                    </Link>
                </div>
            </nav>
            <div className="h-6"></div>
        </div>
    );
}
