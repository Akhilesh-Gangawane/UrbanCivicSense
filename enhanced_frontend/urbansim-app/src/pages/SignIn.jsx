import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';

export default function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await login(phone, password);
            if (data.user.is_admin) {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        }
        setLoading(false);
    }

    return (
        <AuthLayout>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Sign in to your UrbanSim account</p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                    <span className="material-icons-round text-lg">error_outline</span>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Phone Number</label>
                    <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#1C1C21] border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="Enter phone number" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Password</label>
                    <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-[#1C1C21] border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 pr-12 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="Enter your password" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <span className="material-icons-round text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                        </button>
                    </div>
                </div>
                <button type="submit" disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50">
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Signing in...
                        </>
                    ) : 'Sign In'}
                </button>
            </form>
        </AuthLayout>
    );
}
