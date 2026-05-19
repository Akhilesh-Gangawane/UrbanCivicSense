import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import AdminLayout from '../../layouts/AdminLayout';
import { supabase } from '../../services/supabaseClient';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Performance() {
    const [reports, setReports] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const [{ data: reps }, { data: depts }] = await Promise.all([
                supabase.from('reports').select('*, departments(id, name), statuses(id, name)'),
                supabase.from('departments').select('*').order('id'),
            ]);
            setReports(reps || []);
            setDepartments(depts || []);
            setLoading(false);
        }
        load();
    }, []);

    const filtered = selectedDept === 'all' ? reports : reports.filter(r => r.department_id === Number(selectedDept));
    const resolvedCount = filtered.filter(r => r.statuses?.name === 'Resolved' || r.statuses?.name === 'Closed').length;
    const total = filtered.length;
    const resolutionRate = total > 0 ? Math.round((resolvedCount / total) * 100) : 0;

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayCounts = days.map((_, i) => {
        return filtered.filter(r => {
            const d = new Date(r.created_at).getDay();
            return d === (i + 1) % 7;
        }).length;
    });

    const chartData = {
        labels: days,
        datasets: [{
            label: 'Issues',
            data: dayCounts,
            fill: true,
            backgroundColor: 'rgba(88, 101, 242, 0.1)',
            borderColor: 'rgba(88, 101, 242, 1)',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(88, 101, 242, 1)',
        }],
    };

    const chartOptions = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, ticks: { font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
        },
    };

    return (
        <AdminLayout>
            <div className="max-w-md mx-auto px-4 pt-6 pb-20 space-y-4">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Performance</h1>
                        <p className="text-xs text-gray-500">Resolution metrics and trends</p>
                    </div>
                    <Link to="/admin" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500">
                        <span className="material-icons-round">arrow_back</span>
                    </Link>
                </header>

                {/* Department Filter */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                    <button onClick={() => setSelectedDept('all')} className={`text-xs whitespace-nowrap px-3 py-2 rounded-full font-medium transition ${selectedDept === 'all' ? 'bg-primary text-white' : 'bg-white dark:bg-[#1C1C21] text-gray-500'}`}>
                        All Departments
                    </button>
                    {departments.map(d => (
                        <button key={d.id} onClick={() => setSelectedDept(String(d.id))} className={`text-xs whitespace-nowrap px-3 py-2 rounded-full font-medium transition ${selectedDept === String(d.id) ? 'bg-primary text-white' : 'bg-white dark:bg-[#1C1C21] text-gray-500'}`}>
                            {d.name.replace(' Department', '')}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="py-12 text-center text-sm text-gray-400">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mx-auto mb-2"></div>
                    </div>
                ) : (
                    <>
                        {/* Resolution Gauge */}
                        <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-6 shadow-sm text-center">
                            <div className="relative w-28 h-28 mx-auto mb-3">
                                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-100 dark:text-gray-800" />
                                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none"
                                        className={resolutionRate >= 70 ? 'text-green-500' : resolutionRate >= 40 ? 'text-yellow-500' : 'text-red-500'}
                                        strokeDasharray={`${resolutionRate * 2.64} 264`} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{resolutionRate}%</span>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Resolution Rate</p>
                            <p className="text-xs text-gray-500">{resolvedCount} of {total} resolved</p>
                        </section>

                        {/* Chart */}
                        <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                            <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Issues by Day of Week</h3>
                            <Line data={chartData} options={chartOptions} />
                        </section>

                        {/* Department Breakdown */}
                        <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-4 shadow-sm">
                            <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Department Breakdown</h3>
                            <div className="space-y-3">
                                {departments.map(d => {
                                    const dReports = reports.filter(r => r.department_id === d.id);
                                    const dResolved = dReports.filter(r => r.statuses?.name === 'Resolved' || r.statuses?.name === 'Closed').length;
                                    const dRate = dReports.length > 0 ? Math.round((dResolved / dReports.length) * 100) : 0;
                                    return (
                                        <div key={d.id} className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{d.name}</span>
                                                    <span className="text-gray-500">{dRate}% ({dResolved}/{dReports.length})</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${dRate >= 70 ? 'bg-green-500' : dRate >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${dRate}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
