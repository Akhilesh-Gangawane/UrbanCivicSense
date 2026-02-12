import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-background-light dark:bg-background-dark pt-20 pb-10 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">U</div>
                            <span className="font-bold text-xl tracking-tight text-text-main-light dark:text-white">UrbanSim AI</span>
                        </div>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-6">
                            Making cities smarter, safer, and more responsive through the power of Artificial Intelligence.
                        </p>
                        <div className="flex space-x-4">
                            <a className="text-gray-400 hover:text-primary transition" href="#"><span className="material-icons-round">facebook</span></a>
                            <a className="text-gray-400 hover:text-primary transition" href="#"><span className="material-icons-round">thumb_up</span></a>
                            <a className="text-gray-400 hover:text-primary transition" href="#"><span className="material-icons-round">alternate_email</span></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-text-main-light dark:text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-text-muted-light dark:text-text-muted-dark">
                            <li><Link className="hover:text-primary transition" to="#">Features</Link></li>
                            <li><Link className="hover:text-primary transition" to="#">Integrations</Link></li>
                            <li><Link className="hover:text-primary transition" to="#">Security</Link></li>
                            <li><Link className="hover:text-primary transition" to="/pricing">Pricing</Link></li>
                            <li><Link className="hover:text-primary transition" to="#">Changelog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-text-main-light dark:text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-text-muted-light dark:text-text-muted-dark">
                            <li><Link className="hover:text-primary transition" to="#">Documentation</Link></li>
                            <li><Link className="hover:text-primary transition" to="#">API Reference</Link></li>
                            <li><Link className="hover:text-primary transition" to="#">Community</Link></li>
                            <li><Link className="hover:text-primary transition" to="#">Blog</Link></li>
                            <li><Link className="hover:text-primary transition" to="#">Case Studies</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-text-main-light dark:text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-text-muted-light dark:text-text-muted-dark">
                            <li><Link className="hover:text-primary transition" to="#">About</Link></li>
                            <li><Link className="hover:text-primary transition" to="#">Careers</Link></li>
                            <li><Link className="hover:text-primary transition" to="#">Contact</Link></li>
                            <li><Link className="hover:text-primary transition" to="#">Legal</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted-light dark:text-text-muted-dark">
                    <p>© 2024 UrbanSim AI Inc. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link className="hover:text-primary transition" to="#">Privacy Policy</Link>
                        <Link className="hover:text-primary transition" to="#">Terms of Service</Link>
                        <Link className="hover:text-primary transition" to="#">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
