import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reportsAPI } from '../../services/api';

export default function IssuesList() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function load() {
            try {
                const data = await reportsAPI.getAll(0, 200);
                setReports(data || []);
            } catch (err) {
                console.error('Failed to load reports:', err);
            }
            setLoading(false);
        }
        load();
    }, []);

    const statusFilters = ['all', 'New', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

    const filteredReports = reports.filter(r => {
        const matchesFilter = filter === 'all' || r.status === filter;
        const matchesSearch = !search || r.title?.toLowerCase().includes(search.toLowerCase()) || r.description?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    function timeAgo(dateStr) {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans text-gray-900 dark:text-gray-100 flex justify-center pb-20">
            <div className="w-full max-w-md min-h-screen flex flex-col">
                {/* Header */}
                <header className="px-6 pt-10 pb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Issues</h1>
                        <p className="text-xs text-gray-500 mt-1">{filteredReports.length} issues found</p>
                    </div>
                    <Link to="/report" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                        <span className="material-icons-round text-white text-xl">add</span>
                    </Link>
                </header>

                {/* Search */}
                <div className="px-4 mb-3">
                    <div className="relative">
                        <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                        <input type="text" placeholder="Search issues..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white dark:bg-[#1C1C21] border-transparent rounded-xl py-3 pl-10 pr-4 text-sm placeholder-gray-400 focus:ring-1 focus:ring-primary shadow-sm" />
                    </div>
                </div>

                {/* Status Filters */}
                <div className="px-4 mb-4 overflow-x-auto">
                    <div className="flex gap-2">
                        {statusFilters.map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className={`text-xs whitespace-nowrap px-3 py-2 rounded-full font-medium transition-all ${filter === f ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-white dark:bg-[#1C1C21] text-gray-500 hover:text-gray-700'
                                    }`}>
                                {f === 'all' ? 'All' : f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List */}
                <main className="flex-1 px-4 space-y-3 overflow-y-auto">
                    {loading ? (
                        <div className="py-16 text-center text-sm text-gray-400">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mx-auto mb-2"></div>
                            Loading issues...
                        </div>
                    ) : filteredReports.length === 0 ? (
                        <div className="py-16 text-center text-sm text-gray-400">No issues found</div>
                    ) : (
                        filteredReports.map(r => (
                            <Link to={`/issues/${r.id}`} key={r.id}
                                className="block bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 ${r.status === 'Resolved' || r.status === 'Closed' ? 'bg-green-500' :
                                            r.status === 'In Progress' ? 'bg-yellow-500' :
                                                r.status === 'Assigned' ? 'bg-blue-500' : 'bg-gray-500'
                                        }`}>
                                        <span className="material-icons-round text-lg">
                                            {r.category === 'Pothole' || r.category === 'Road Damage' ? 'engineering' :
                                                r.category === 'Street Light' ? 'light' :
                                                    r.category === 'Water Leak' || r.category === 'Drain Blockage' ? 'water_drop' :
                                                        r.category === 'Garbage Pile' || r.category === 'Illegal Dumping' ? 'delete' :
                                                            'report'}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{r.title}</p>
                                        <p className="text-[10px] text-gray-500 mt-0.5">{r.category || 'General'} · {r.department || 'Unassigned'} · {timeAgo(r.created_at)}</p>
                                    </div>
                                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${r.status === 'Resolved' || r.status === 'Closed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            r.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                r.status === 'Assigned' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                        }`}>{r.status}</span>
                                </div>
                            </Link>
                        ))
                    )}
                </main>
            </div>
        </div>
    );
}
