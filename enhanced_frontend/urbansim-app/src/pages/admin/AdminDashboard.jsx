import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabaseClient';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ total: 0, resolved: 0, inProgress: 0, newCount: 0 });
    const [deptHealth, setDeptHealth] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                // Fetch all reports with department join
                const { data: reports } = await supabase.from('reports').select('*, departments(id, name), statuses(id, name)');
                const all = reports || [];

                const total = all.length;
                const resolved = all.filter(r => r.statuses?.name === 'Resolved' || r.statuses?.name === 'Closed').length;
                const inProgress = all.filter(r => r.statuses?.name === 'In Progress').length;
                const newCount = all.filter(r => r.statuses?.name === 'New' || r.statuses?.name === 'Assigned').length;
                setStats({ total, resolved, inProgress, newCount });

                // Compute department health
                const { data: depts } = await supabase.from('departments').select('*').order('id');
                const health = (depts || []).map(d => {
                    const deptReports = all.filter(r => r.department_id === d.id);
                    const deptResolved = deptReports.filter(r => r.statuses?.name === 'Resolved' || r.statuses?.name === 'Closed').length;
                    const rate = deptReports.length > 0 ? Math.round((deptResolved / deptReports.length) * 100) : 0;
                    return { name: d.name, total: deptReports.length, resolved: deptResolved, rate };
                });
                setDeptHealth(health);
            } catch (err) {
                console.error('Admin dashboard error:', err);
            }
            setLoading(false);
        }
        load();
    }, []);

    const deptIcons = { 'Public Works Department': '🏗️', 'Electrical Department': '💡', 'Water Supply Department': '💧', 'Solid Waste Management': '🗑️', 'Urban Health Department': '🏥' };

    return (
        <AdminLayout>
            <div className="max-w-md mx-auto min-h-screen relative overflow-hidden">
                <header className="pt-8 pb-4 px-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-icons-round text-primary">admin_panel_settings</span>
                            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Admin Panel</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Welcome, {user?.full_name || 'Admin'}</p>
                    </div>
                </header>

                <main className="px-4 pb-24 space-y-4">
                    {/* Stats */}
                    <section className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Total Reports', value: stats.total, icon: 'description', color: 'blue' },
                            { label: 'Resolved', value: stats.resolved, icon: 'check_circle', color: 'green' },
                            { label: 'In Progress', value: stats.inProgress, icon: 'pending_actions', color: 'yellow' },
                            { label: 'Open', value: stats.newCount, icon: 'schedule', color: 'red' },
                        ].map(s => (
                            <div key={s.label} className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-8 h-8 rounded-lg bg-${s.color}-100 dark:bg-${s.color}-900/30 flex items-center justify-center`}>
                                        <span className={`material-icons-round text-${s.color}-600 dark:text-${s.color}-400 text-lg`}>{s.icon}</span>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '...' : s.value}</p>
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{s.label}</p>
                            </div>
                        ))}
                    </section>

                    {/* Department Health */}
                    <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                            <span className="material-icons-round text-primary text-lg">health_and_safety</span>
                            Department Health
                        </h3>
                        {loading ? (
                            <div className="py-8 text-center text-xs text-gray-400">Loading...</div>
                        ) : (
                            <div className="space-y-3">
                                {deptHealth.map(d => (
                                    <div key={d.name} className="flex items-center gap-3">
                                        <span className="text-lg">{deptIcons[d.name] || '🏛️'}</span>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{d.name}</span>
                                                <span className="text-xs text-gray-500">{d.resolved}/{d.total}</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full transition-all ${d.rate >= 70 ? 'bg-green-500' : d.rate >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                    style={{ width: `${d.total > 0 ? d.rate : 0}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Quick Links */}
                    <section className="grid grid-cols-2 gap-3">
                        <Link to="/admin/map" className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm hover:shadow-md transition text-center">
                            <span className="material-icons-round text-blue-500 text-3xl mb-2 block">map</span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Issues Map</span>
                        </Link>
                        <Link to="/admin/performance" className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm hover:shadow-md transition text-center">
                            <span className="material-icons-round text-green-500 text-3xl mb-2 block">trending_up</span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Performance</span>
                        </Link>
                    </section>
                </main>
            </div>
        </AdminLayout>
    );
}
