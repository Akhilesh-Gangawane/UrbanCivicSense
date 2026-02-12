import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { supabase } from '../../services/supabaseClient';

export default function AdminMap() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        async function load() {
            const { data: sts } = await supabase.from('statuses').select('*').order('id');
            setStatuses(sts || []);
            await fetchIssues('all', sts || []);
        }
        load();
    }, []);

    async function fetchIssues(statusFilter, stsList) {
        setLoading(true);
        let query = supabase.from('reports').select('*, departments(id, name), statuses(id, name), categories(id, name)').order('created_at', { ascending: false });
        if (statusFilter !== 'all') {
            const sts = (stsList || statuses).find(s => s.name === statusFilter);
            if (sts) query = query.eq('status_id', sts.id);
        }
        const { data } = await query;
        setIssues(data || []);
        setLoading(false);
    }

    function handleFilter(f) {
        setFilter(f);
        fetchIssues(f, statuses);
    }

    const deptColors = {
        'Public Works Department': 'bg-orange-500',
        'Electrical Department': 'bg-yellow-500',
        'Water Supply Department': 'bg-blue-500',
        'Solid Waste Management': 'bg-green-500',
        'Urban Health Department': 'bg-red-500',
    };

    return (
        <AdminLayout>
            <div className="max-w-md mx-auto px-4 pt-6 pb-20 space-y-4">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Issues Map</h1>
                        <p className="text-xs text-gray-500">{issues.length} issues</p>
                    </div>
                    <Link to="/admin" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500">
                        <span className="material-icons-round">arrow_back</span>
                    </Link>
                </header>

                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-6 text-center">
                    <span className="material-icons-round text-4xl text-blue-500 mb-2">map</span>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{issues.length} Issues With Location</p>
                    <p className="text-[10px] text-gray-500">Issues plotted by GPS coordinates</p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {['all', ...statuses.map(s => s.name)].map(f => (
                        <button key={f} onClick={() => handleFilter(f)}
                            className={`text-xs whitespace-nowrap px-3 py-2 rounded-full font-medium transition ${filter === f ? 'bg-primary text-white' : 'bg-white dark:bg-[#1C1C21] text-gray-500'
                                }`}>
                            {f === 'all' ? 'All' : f}
                        </button>
                    ))}
                </div>

                {/* Issue Cards */}
                {loading ? (
                    <div className="py-12 text-center text-sm text-gray-400">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mx-auto mb-2"></div>
                        Loading...
                    </div>
                ) : (
                    <div className="space-y-3">
                        {issues.map(issue => (
                            <div key={issue.id} className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 ${deptColors[issue.departments?.name] || 'bg-gray-500'}`}>
                                        <span className="material-icons-round text-lg">location_on</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{issue.title}</p>
                                        <p className="text-[10px] text-gray-500 mt-0.5">
                                            {issue.departments?.name || 'Unassigned'} · {issue.categories?.name || 'General'}
                                        </p>
                                        {issue.location_lat && (
                                            <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                                                <span className="material-icons-round text-xs">place</span>
                                                {issue.location_address || `${issue.location_lat.toFixed(4)}, ${issue.location_long.toFixed(4)}`}
                                            </p>
                                        )}
                                    </div>
                                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${issue.statuses?.name === 'Resolved' || issue.statuses?.name === 'Closed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            issue.statuses?.name === 'In Progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        }`}>{issue.statuses?.name || 'New'}</span>
                                </div>
                            </div>
                        ))}
                        {issues.length === 0 && <p className="py-8 text-center text-sm text-gray-400">No issues found</p>}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
