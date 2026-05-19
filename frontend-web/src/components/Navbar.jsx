import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">U</div>
                <Link to="/" className="font-bold text-xl tracking-tight text-text-main-light dark:text-white">UrbanSim AI</Link>
            </div>
            <button className="md:hidden text-text-main-light dark:text-text-main-dark">
                <span className="material-icons-round text-3xl">menu</span>
            </button>
            <div className="hidden md:flex space-x-6 items-center font-medium">
                <Link to="/features" className="hover:text-primary transition text-text-main-light dark:text-text-main-dark">Features</Link>
                <Link to="/solutions" className="hover:text-primary transition text-text-main-light dark:text-text-main-dark">Solutions</Link>
                <Link to="/pricing" className="hover:text-primary transition text-text-main-light dark:text-text-main-dark">Pricing</Link>
                <Link to="/report-issue" className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full transition shadow-glow">Start Reporting</Link>
            </div>
        </nav>
    );
}
