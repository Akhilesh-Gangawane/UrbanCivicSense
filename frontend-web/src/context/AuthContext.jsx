import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session: s } }) => {
            setSession(s);
            if (s?.user) _loadProfile(s.user.id);
            else setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
            setSession(s);
            if (s?.user) _loadProfile(s.user.id);
            else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    async function _loadProfile(authId) {
        try {
            const { data } = await supabase
                .from('users')
                .select('*')
                .eq('id', authId)
                .single();
            setUser(data || { id: authId });
        } catch {
            setUser({ id: authId });
        }
        setLoading(false);
    }

    async function login(id, password) {
        setLoading(true);
        try {
            let res;
            if (id === '123456789' && password === 'admin123') {
                // Hardcoded Admin
                res = {
                    user: {
                        id: 'admin_id',
                        full_name: 'Admin User',
                        email: 'admin@urbansim.ai',
                        mobile_number: '123456789',
                        is_admin: true
                    },
                    session: { access_token: 'mock_admin_token' }
                };
            } else if (id === '987654321' && password === 'user123') {
                // Hardcoded User
                res = {
                    user: {
                        id: 'user_id',
                        full_name: 'Citizen User',
                        email: 'user@urbansim.ai',
                        mobile_number: '987654321',
                        is_admin: false
                    },
                    session: { access_token: 'mock_user_token' }
                };
            } else {
                throw new Error('Invalid phone number or password');
            }

            setUser(res.user);
            setSession(res.session);
            localStorage.setItem('token', res.session.access_token);
            return res;
        } finally {
            setLoading(false);
        }
    }

    async function signup({ email, password, full_name, mobile_number, is_admin = false }) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name, mobile_number, is_admin },
            },
        });
        if (error) throw new Error(error.message);

        // The database trigger auto-creates public.users from user_metadata
        // Wait briefly for the trigger to complete, then load profile
        if (data.session) {
            await new Promise(r => setTimeout(r, 500));
            await _loadProfile(data.user.id);
        } else {
            // Email confirmation required — set basic user info
            setUser({ id: data.user?.id, email, full_name, mobile_number, is_admin });
            setLoading(false);
        }
        return data;
    }

    async function logout() {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be inside AuthProvider');
    return ctx;
}

// Protected route wrapper
export function ProtectedRoute({ children, adminOnly = false }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0B0C15]">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!user) return <Navigate to="/signin" replace />;
    if (adminOnly && !user.is_admin) return <Navigate to="/dashboard" replace />;

    return children;
}
