import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AppLayout({ children }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-sans transition-colors duration-200">

            <main className="flex-1 pb-20 relative">
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 z-50 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur border-t border-gray-200 dark:border-gray-800 pb-5 pt-3 px-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-center text-xs font-medium">
                    <Link to="/dashboard" className={`flex flex-col items-center gap-1 w-16 transition-colors ${isActive('/dashboard') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                        <span className="material-icons-round text-2xl">dashboard</span>
                        <span>Home</span>
                    </Link>
                    <Link to="/issues" className={`flex flex-col items-center gap-1 w-16 transition-colors ${isActive('/issues') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                        <span className="material-icons-round text-2xl">list_alt</span>
                        <span>Issues</span>
                    </Link>
                    {/* Middle Action Button Placeholder - could be Report 
            <Link to="/report-issue" className="flex flex-col items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg -mt-8 border-4 border-background-light dark:border-background-dark">
                <span className="material-icons-round text-2xl">add</span>
            </Link>
            */}
                    <Link to="/map" className={`flex flex-col items-center gap-1 w-16 transition-colors ${isActive('/map') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                        <span className="material-icons-round text-2xl">map</span>
                        <span>Map</span>
                    </Link>
                    <Link to="/settings" className={`flex flex-col items-center gap-1 w-16 transition-colors ${isActive('/settings') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                        <span className="material-icons-round text-2xl">settings</span>
                        <span>Settings</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
