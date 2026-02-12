import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { reportsAPI } from '../../services/api';

export default function IssueDetails() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await reportsAPI.getById(id);
                setReport(data);
            } catch (err) {
                console.error('Failed to load report:', err);
            }
            setLoading(false);
        }
        load();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center">
                <div className="text-center text-gray-400 space-y-2">
                    <span className="material-icons-round text-4xl">search_off</span>
                    <p className="text-sm">Report not found</p>
                    <Link to="/issues" className="text-primary text-xs">Back to Issues</Link>
                </div>
            </div>
        );
    }

    const statusConfig = {
        'New': { color: 'gray', icon: 'fiber_new' },
        'Assigned': { color: 'blue', icon: 'assignment_ind' },
        'In Progress': { color: 'yellow', icon: 'pending_actions' },
        'Resolved': { color: 'green', icon: 'check_circle' },
        'Closed': { color: 'green', icon: 'verified' },
    };
    const sc = statusConfig[report.status] || statusConfig['New'];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans text-gray-900 dark:text-gray-100 flex justify-center pb-20">
            <div className="w-full max-w-md min-h-screen flex flex-col">
                {/* Header */}
                <header className="px-6 pt-10 pb-4 flex items-center gap-3">
                    <Link to="/issues" className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                        <span className="material-icons-round text-2xl">arrow_back</span>
                    </Link>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-semibold truncate">{report.title}</h1>
                        <p className="text-xs text-gray-500">ID: #{report.id}</p>
                    </div>
                </header>

                <main className="flex-1 px-4 space-y-4 overflow-y-auto">
                    {/* Status Banner */}
                    <div className={`bg-${sc.color}-50 dark:bg-${sc.color}-900/20 border border-${sc.color}-200 dark:border-${sc.color}-800 rounded-2xl p-4 flex items-center gap-3`}>
                        <span className={`material-icons-round text-${sc.color}-600 dark:text-${sc.color}-400 text-2xl`}>{sc.icon}</span>
                        <div>
                            <p className={`text-sm font-semibold text-${sc.color}-700 dark:text-${sc.color}-300`}>{report.status}</p>
                            <p className="text-[10px] text-gray-500">Updated {new Date(report.updated_at || report.created_at).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                            <span className="material-icons-round text-primary text-sm">description</span>
                            Description
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{report.description}</p>
                    </section>

                    {/* Details Grid */}
                    <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                            <span className="material-icons-round text-primary text-sm">info</span>
                            Details
                        </h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-[10px] uppercase text-gray-400 font-medium">Category</p>
                                <p className="font-medium">{report.category || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-gray-400 font-medium">Department</p>
                                <p className="font-medium">{report.department || 'Unassigned'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-gray-400 font-medium">Priority</p>
                                <p className={`font-medium capitalize ${report.priority === 'high' || report.priority === 'critical' ? 'text-red-600' : report.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`}>
                                    {report.priority || 'Medium'}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-gray-400 font-medium">Reported</p>
                                <p className="font-medium">{new Date(report.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </section>

                    {/* Location */}
                    {(report.location_lat || report.location_address) && (
                        <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                                <span className="material-icons-round text-primary text-sm">location_on</span>
                                Location
                            </h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{report.location_address || `${report.location_lat}, ${report.location_long}`}</p>
                        </section>
                    )}

                    {/* Reporter */}
                    <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                            <span className="material-icons-round text-primary text-sm">person</span>
                            Reported By
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-bold text-sm">{(report.user_name || 'A')[0]}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">{report.user_name || 'Anonymous'}</p>
                                <p className="text-[10px] text-gray-500">{report.user_email || ''}</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
