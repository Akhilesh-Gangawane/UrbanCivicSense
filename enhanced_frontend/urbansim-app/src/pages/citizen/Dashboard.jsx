import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { reportsAPI, dashboardAPI } from '../../services/api';
import CivicLawChatbot from '../../components/CivicLawChatbot';

export default function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ total_reports: 0, resolved: 0, in_progress: 0, pending: 0 });
    const [recentReports, setRecentReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [summaryRes, reportsRes] = await Promise.all([
                    dashboardAPI.getSummary(),
                    reportsAPI.getAll(0, 5),
                ]);
                setStats(summaryRes.public_stats || summaryRes);
                setRecentReports(reportsRes || []);
            } catch (err) {
                console.error('Dashboard load error:', err);
            }
            setLoading(false);
        }
        load();
    }, []);

    const greeting = () => {
        const h = new Date().getHours();
        return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans text-gray-900 dark:text-gray-100 flex justify-center pb-20">
            <div className="w-full max-w-md min-h-screen flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className="px-6 pt-10 pb-6 z-10">
                    <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">{greeting()}</p>
                    <h1 className="text-2xl font-bold">{user?.full_name || 'Citizen'}</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Track civic issues in your city</p>
                </header>

                <main className="flex-1 px-4 space-y-5 overflow-y-auto">
                    {/* Stats Grid */}
                    <section className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Total Issues', value: stats.total_reports, icon: 'assignment', color: 'blue' },
                            { label: 'Resolved', value: stats.resolved, icon: 'check_circle', color: 'green' },
                            { label: 'In Progress', value: stats.in_progress, icon: 'pending_actions', color: 'yellow' },
                            { label: 'Pending', value: stats.pending, icon: 'schedule', color: 'red' },
                        ].map(s => (
                            <div key={s.label} className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-8 h-8 rounded-lg bg-${s.color}-100 dark:bg-${s.color}-900/30 flex items-center justify-center`}>
                                        <span className={`material-icons-round text-${s.color}-600 dark:text-${s.color}-400 text-lg`}>{s.icon}</span>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold">{loading ? '...' : s.value}</p>
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{s.label}</p>
                            </div>
                        ))}
                    </section>

                    {/* Quick Actions */}
                    <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            <span className="material-icons-round text-primary text-lg">bolt</span>
                            Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Link to="/report-issue" className="flex flex-col items-center gap-2 py-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
                                <span className="material-icons-round text-primary text-2xl">add_circle</span>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Report Issue</span>
                            </Link>
                            <Link to="/issues" className="flex flex-col items-center gap-2 py-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                <span className="material-icons-round text-blue-600 dark:text-blue-400 text-2xl">list_alt</span>
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">View Issues</span>
                            </Link>
                        </div>
                    </section>

                    {/* Recent Reports */}
                    <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold flex items-center gap-2">
                                <span className="material-icons-round text-primary text-lg">history</span>
                                Recent Reports
                            </h3>
                            <Link to="/issues" className="text-xs text-primary font-medium">See all</Link>
                        </div>
                        {loading ? (
                            <div className="py-8 text-center text-xs text-gray-400">Loading...</div>
                        ) : recentReports.length === 0 ? (
                            <div className="py-8 text-center text-xs text-gray-400">No reports yet. Start by reporting an issue!</div>
                        ) : (
                            <div className="space-y-2">
                                {recentReports.map(r => (
                                    <Link to={`/issues/${r.id}`} key={r.id}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#27272E] transition-colors">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold ${r.status === 'Resolved' || r.status === 'Closed' ? 'bg-green-500' :
                                            r.status === 'In Progress' ? 'bg-yellow-500' : 'bg-blue-500'
                                            }`}>
                                            <span className="material-icons-round text-lg">
                                                {r.status === 'Resolved' || r.status === 'Closed' ? 'check_circle' :
                                                    r.status === 'In Progress' ? 'pending_actions' : 'report'}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{r.title}</p>
                                            <p className="text-[10px] text-gray-500">{r.category || 'General'} · {new Date(r.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${r.status === 'Resolved' || r.status === 'Closed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            r.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}>{r.status}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                </main>

                {/* Chatbot Portal */}
                <CivicLawChatbot />
            </div>
        </div>
    );
}
