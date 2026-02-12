import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';

export default function SignUp() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ full_name: '', email: '', mobile_number: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function update(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
        if (!/^\d{10}$/.test(form.mobile_number)) { setError('Mobile number must be 10 digits'); return; }
        setLoading(true);
        try {
            await signup(form);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Signup failed');
        }
        setLoading(false);
    }

    return (
        <AuthLayout>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Join UrbanSim for a better city</p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                    <span className="material-icons-round text-lg">error_outline</span>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Full Name</label>
                    <input type="text" required value={form.full_name} onChange={(e) => update('full_name', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#1C1C21] border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Your full name" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#1C1C21] border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="name@example.com" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Mobile Number</label>
                    <input type="tel" required value={form.mobile_number} onChange={(e) => update('mobile_number', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#1C1C21] border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="10-digit number" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Password</label>
                    <input type="password" required value={form.password} onChange={(e) => update('password', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#1C1C21] border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Min 6 characters" />
                </div>
                <button type="submit" disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50">
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Creating account...
                        </>
                    ) : 'Create Account'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Already have an account?{' '}
                <Link to="/signin" className="text-primary font-medium hover:underline">Sign In</Link>
            </p>
        </AuthLayout>
    );
}
