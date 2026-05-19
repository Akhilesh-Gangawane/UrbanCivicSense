import React from 'react';

export default function AuthLayout({ children }) {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col justify-center items-center p-4 transition-colors duration-200 relative font-sans">
            {/* Background decorative elements could go here if shared */}
            {children}
        </div>
    );
}
