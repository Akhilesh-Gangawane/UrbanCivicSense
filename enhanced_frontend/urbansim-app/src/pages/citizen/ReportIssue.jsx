import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { reportsAPI, metaAPI } from '../../services/api';
import { supabase } from '../../services/supabaseClient';

export default function ReportIssue() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Lookup data from Supabase
    const [categories, setCategories] = useState([]);
    const [departments, setDepartments] = useState([]);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [priority, setPriority] = useState('medium');
    const [locationAddress, setLocationAddress] = useState('');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    // Load categories and departments from Supabase
    useEffect(() => {
        async function loadMeta() {
            try {
                const [cats, depts] = await Promise.all([
                    metaAPI.getCategories(),
                    metaAPI.getDepartments(),
                ]);
                setCategories(cats || []);
                setDepartments(depts || []);
                if (cats?.length) setCategoryId(cats[0].id);
            } catch (err) {
                console.error('Loading categories/departments:', err);
            }
        }
        loadMeta();
    }, []);

    function detectLocation() {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLat(pos.coords.latitude);
                setLng(pos.coords.longitude);
                setLocationAddress(`GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
            },
            () => setLocationAddress('Location access denied')
        );
    }

    // Map categories to departments
    function guessDepartmentId() {
        const categoryName = categories.find(c => c.id === categoryId)?.name || '';
        const map = {
            'Pothole': 1, 'Road Damage': 1,          // Public Works
            'Street Light': 2,                         // Electrical
            'Water Leak': 3, 'Drain Blockage': 3,     // Water Supply
            'Garbage Pile': 4, 'Illegal Dumping': 4,   // Solid Waste
            'Stray Animals': 5,                        // Urban Health
        };
        return map[categoryName] || 1;
    }

    async function handleSubmit() {
        setError('');
        setLoading(true);
        try {
            await reportsAPI.create({
                title,
                description,
                category_id: categoryId,
                department_id: guessDepartmentId(),
                location_lat: lat || 18.5204,
                location_long: lng || 73.8567,
                location_address: locationAddress || 'Not specified',
                priority,
                is_auto_assigned: true,
            });
            setSuccess(true);
            setTimeout(() => navigate('/issues'), 1500);
        } catch (err) {
            setError(err.message || 'Failed to submit report');
        }
        setLoading(false);
    }

    if (success) {
        return (
            <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans flex items-center justify-center px-6">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <span className="material-icons-round text-green-600 dark:text-green-400 text-4xl">check_circle</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Report Submitted!</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your issue has been reported. We'll notify the relevant department.</p>
                </div>
            </div>
        );
    }

    const selectedCategoryName = categories.find(c => c.id === categoryId)?.name || '';

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans text-gray-900 dark:text-gray-100 flex justify-center pb-20">
            <div className="w-full max-w-md bg-background-light dark:bg-background-dark min-h-screen flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className="px-6 pt-12 pb-4 flex items-center justify-between z-10">
                    <Link to="/issues" className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
                        <span className="material-icons-round text-2xl">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-semibold tracking-tight">Report Issue</h1>
                    <div className="w-10"></div>
                </header>

                {/* Stepper */}
                <div className="px-6 mb-6">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full -z-10"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary rounded-full -z-10 transition-all" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
                        {[{ num: 1, label: 'Details' }, { num: 2, label: 'Location' }, { num: 3, label: 'Review' }].map(s => (
                            <div key={s.num} className="flex flex-col items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-all ${step >= s.num ? 'bg-primary text-white shadow-primary/30' : 'bg-white dark:bg-[#1C1C21] border-2 border-gray-300 dark:border-gray-600 text-gray-400'
                                    }`}>{s.num}</div>
                                <span className={`text-[10px] font-medium ${step >= s.num ? 'text-primary' : 'text-gray-400'}`}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="mx-4 mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                        <span className="material-icons-round text-lg">error_outline</span>
                        {error}
                    </div>
                )}

                <main className="flex-1 px-4 pb-24 overflow-y-auto space-y-6">
                    {/* Step 1: Details */}
                    {step === 1 && (
                        <section className="bg-white dark:bg-[#1C1C21] p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span className="material-icons-round text-lg">edit_note</span>
                                </div>
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Issue Details</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Issue Title</label>
                                    <input className="w-full bg-gray-50 dark:bg-[#27272E] border-transparent focus:border-primary focus:ring-0 rounded-xl text-sm py-3 px-4 placeholder-gray-400 shadow-sm" placeholder="Briefly describe the issue..." type="text"
                                        value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Description</label>
                                    <textarea className="w-full bg-gray-50 dark:bg-[#27272E] border-transparent focus:border-primary focus:ring-0 rounded-xl text-sm py-3 px-4 placeholder-gray-400 shadow-sm resize-none" rows={3} placeholder="Describe what you see in detail..."
                                        value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Category</label>
                                    <select className="w-full bg-gray-50 dark:bg-[#27272E] border-transparent focus:border-primary focus:ring-0 rounded-xl text-sm py-3 px-4 appearance-none shadow-sm cursor-pointer"
                                        value={categoryId || ''} onChange={(e) => setCategoryId(Number(e.target.value))}>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Priority</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['low', 'medium', 'high'].map(p => (
                                            <button key={p} type="button" onClick={() => setPriority(p)}
                                                className={`py-2 rounded-xl text-sm font-medium capitalize transition-all ${priority === p ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 dark:bg-[#27272E] text-gray-600 dark:text-gray-300 hover:bg-gray-100'}`}>
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Step 2: Location */}
                    {step === 2 && (
                        <section className="bg-white dark:bg-[#1C1C21] p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <span className="material-icons-round text-lg">location_on</span>
                                </div>
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Location</h2>
                            </div>
                            <button type="button" onClick={detectLocation}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 dark:bg-[#27272E] rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2E2E36] transition-colors mb-4">
                                <span className="material-icons-round text-primary">my_location</span>
                                Use My Current Location
                            </button>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Address (Optional)</label>
                                <input className="w-full bg-gray-50 dark:bg-[#27272E] border-transparent focus:border-primary focus:ring-0 rounded-xl text-sm py-3 px-4 placeholder-gray-400 shadow-sm" placeholder="Enter street address..."
                                    value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} />
                            </div>
                            {lat && lng && (
                                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 dark:bg-[#27272E] p-2 rounded-lg">
                                    <span className="material-icons-round text-sm text-green-500">check_circle</span>
                                    GPS: {lat.toFixed(4)}, {lng.toFixed(4)}
                                </div>
                            )}
                        </section>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <section className="bg-white dark:bg-[#1C1C21] p-5 rounded-2xl shadow-sm">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                                <span className="material-icons-round text-primary text-lg">preview</span>
                                Review Your Report
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-gray-500">Title</span>
                                    <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] truncate">{title}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-gray-500">Category</span>
                                    <span className="text-gray-900 dark:text-white font-medium">{selectedCategoryName}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-gray-500">Priority</span>
                                    <span className={`font-medium capitalize ${priority === 'high' ? 'text-red-600' : priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`}>{priority}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-gray-500">Department</span>
                                    <span className="text-gray-900 dark:text-white font-medium">{departments.find(d => d.id === guessDepartmentId())?.name || 'Auto'}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-500">Location</span>
                                    <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%] truncate">{locationAddress || 'Not specified'}</span>
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                {/* Bottom Actions */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 z-20">
                    <div className="flex gap-3">
                        {step > 1 && (
                            <button onClick={() => setStep(step - 1)}
                                className="px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-all">
                                Back
                            </button>
                        )}
                        {step < 3 ? (
                            <button onClick={() => {
                                if (step === 1 && !title) { setError('Please enter a title'); return; }
                                setError('');
                                setStep(step + 1);
                            }}
                                className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                                <span>Continue</span>
                                <span className="material-icons-round text-xl">arrow_forward</span>
                            </button>
                        ) : (
                            <button onClick={handleSubmit} disabled={loading}
                                className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50">
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <span>Confirm & Submit</span>
                                        <span className="material-icons-round text-xl">send</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
