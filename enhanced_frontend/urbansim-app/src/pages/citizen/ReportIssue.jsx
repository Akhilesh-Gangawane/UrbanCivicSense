import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { reportsAPI, metaAPI, predictionAPI } from '../../services/api';
import { supabase } from '../../services/supabaseClient';

export default function ReportIssue() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Lookup data from Supabase/Fallbacks
    const [categories, setCategories] = useState([]);
    const [departments, setDepartments] = useState([]);

    // Form State
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [priority, setPriority] = useState('medium');
    const [locationAddress, setLocationAddress] = useState('');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    // Load categories and departments
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
            analyzeImage(file);
        }
    };

    const analyzeImage = async (file) => {
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setError('');

        try {
            const result = await predictionAPI.predictImage(file);

            if (result.success) {
                // Map AI prediction to database categories
                // sanitation_dept -> Garbage Pile (6)
                // road_dept -> Pothole (1)
                // electricity_dept -> Street Light (3)
                // water_dept -> Water Leak (4)

                let mappedCategoryId = 1;
                let mappedCategoryName = 'Pothole';
                let suggestedPriority = 'medium';

                if (result.prediction === 'sanitation_dept') {
                    mappedCategoryId = 6;
                    mappedCategoryName = 'Garbage Pile';
                    suggestedPriority = 'high';
                } else if (result.prediction === 'road_dept') {
                    mappedCategoryId = 1;
                    mappedCategoryName = 'Pothole';
                    suggestedPriority = result.confidence > 90 ? 'high' : 'medium';
                } else if (result.prediction === 'electricity_dept') {
                    mappedCategoryId = 3;
                    mappedCategoryName = 'Street Light';
                    suggestedPriority = 'medium';
                } else if (result.prediction === 'water_dept') {
                    mappedCategoryId = 4;
                    mappedCategoryName = 'Water Leak';
                    suggestedPriority = 'high';
                }

                setAnalysisResult({
                    categoryName: mappedCategoryName,
                    categoryId: mappedCategoryId,
                    confidence: (result.confidence / 100).toFixed(2),
                    detectedPriority: suggestedPriority,
                    originalPrediction: result.original_prediction
                });

                // Auto-populate
                setCategoryId(mappedCategoryId);
                setPriority(suggestedPriority);
                setTitle(`${mappedCategoryName} Issue Detected`);
            } else {
                throw new Error('Analysis unsuccessful');
            }
        } catch (err) {
            console.error('Image analysis error:', err);
            setError('AI Analysis failed. You can still fill details manually.');

            // Fallback to manual if API fails
            setAnalysisResult({
                categoryName: 'Unknown',
                confidence: '0.00',
                detectedPriority: 'medium',
                error: true
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

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

    function guessDepartmentId() {
        const categoryName = categories.find(c => c.id === categoryId)?.name || '';
        const map = {
            'Pothole': 1, 'Road Damage': 1,
            'Street Light': 2,
            'Water Leak': 3, 'Drain Blockage': 3,
            'Garbage Pile': 4, 'Illegal Dumping': 4,
            'Stray Animals': 5,
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your issue has been reported with AI analysis. We'll notify the relevant department.</p>
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
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary rounded-full -z-10 transition-all" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                        {[{ num: 1, label: 'Photo' }, { num: 2, label: 'Details' }, { num: 3, label: 'Location' }, { num: 4, label: 'Review' }].map(s => (
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
                    {/* Step 1: Image Upload & Analysis */}
                    {step === 1 && (
                        <section className="space-y-6">
                            <div className="bg-white dark:bg-[#1C1C21] p-5 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                        <span className="material-icons-round text-lg">add_a_photo</span>
                                    </div>
                                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Upload Issue Photo</h2>
                                </div>

                                <label className="block cursor-pointer">
                                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-[#27272E] transition-colors relative overflow-hidden group">
                                        {imagePreview ? (
                                            <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" alt="Preview" />
                                        ) : null}
                                        <div className="z-10 flex flex-col items-center">
                                            <span className="material-icons-round text-4xl text-primary mb-2">upload_file</span>
                                            <span className="text-sm font-medium">Click to upload or drag & drop</span>
                                            <span className="text-xs text-gray-400 mt-1">Supports JPG, PNG (Max 5MB)</span>
                                        </div>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>

                            {/* AI Analysis View */}
                            {(isAnalyzing || analysisResult) && (
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-2xl text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10">
                                        <span className="material-icons-round text-6xl">psychology</span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                                            <span className="material-icons-round text-sm">auto_fix_high</span>
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-80">UrbanSense AI Engine</span>
                                    </div>

                                    {isAnalyzing ? (
                                        <div className="py-2 space-y-3">
                                            <div className="h-4 bg-white/20 rounded-full w-3/4 animate-pulse"></div>
                                            <div className="h-4 bg-white/20 rounded-full w-1/2 animate-pulse"></div>
                                            <p className="text-xs font-medium animate-bounce mt-2 text-indigo-100">Analyzing visual patterns...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <p className="text-lg font-bold">Issue Detected!</p>
                                            <div className="grid grid-cols-2 gap-3 mt-4">
                                                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                                                    <span className="text-[10px] uppercase font-bold text-indigo-100 block mb-1">Classification</span>
                                                    <span className="text-sm font-semibold">{analysisResult.categoryName}</span>
                                                </div>
                                                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                                                    <span className="text-[10px] uppercase font-bold text-indigo-100 block mb-1">Confidence</span>
                                                    <span className="text-sm font-semibold">{(analysisResult.confidence * 100).toFixed(1)}%</span>
                                                </div>
                                                <div className="col-span-2 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                                                    <span className="text-[10px] uppercase font-bold text-indigo-100 block mb-1">Recommended Priority</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-2 h-2 rounded-full ${analysisResult.detectedPriority === 'high' ? 'bg-orange-400' : 'bg-yellow-400'}`}></span>
                                                        <span className="text-sm font-semibold capitalize">{analysisResult.detectedPriority}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[10px] leading-relaxed text-indigo-100 mt-2 italic">
                                                * Parameters auto-filled based on neural analysis of visual markers.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </section>
                    )}

                    {/* Step 2: Details */}
                    {step === 2 && (
                        <section className="bg-white dark:bg-[#1C1C21] p-5 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span className="material-icons-round text-lg">edit_note</span>
                                </div>
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Refine Details</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Issue Title</label>
                                    <input className="w-full bg-gray-50 dark:bg-[#27272E] border-transparent focus:border-primary focus:ring-0 rounded-xl text-sm py-3 px-4 placeholder-gray-400 shadow-sm transition-all" placeholder="Briefly describe the issue..." type="text"
                                        value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Description</label>
                                    <textarea className="w-full bg-gray-50 dark:bg-[#27272E] border-transparent focus:border-primary focus:ring-0 rounded-xl text-sm py-3 px-4 placeholder-gray-400 shadow-sm resize-none transition-all" rows={3} placeholder="Describe what you see in detail..."
                                        value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">Category</label>
                                    <select className="w-full bg-gray-50 dark:bg-[#27272E] border-transparent focus:border-primary focus:ring-0 rounded-xl text-sm py-3 px-4 appearance-none shadow-sm cursor-pointer transition-all"
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

                    {/* Step 3: Location */}
                    {step === 3 && (
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
                                <input className="w-full bg-gray-50 dark:bg-[#27272E] border-transparent focus:border-primary focus:ring-0 rounded-xl text-sm py-3 px-4 placeholder-gray-400 shadow-sm transition-all" placeholder="Enter street address..."
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

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <section className="bg-white dark:bg-[#1C1C21] p-5 rounded-2xl shadow-sm">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                                <span className="material-icons-round text-primary text-lg">preview</span>
                                Review Your Report
                            </h2>
                            <div className="space-y-3 text-sm">
                                {imagePreview && (
                                    <div className="h-32 w-full rounded-xl overflow-hidden mb-4 border border-gray-100 dark:border-gray-800">
                                        <img src={imagePreview} className="w-full h-full object-cover" alt="Issue photo" />
                                    </div>
                                )}
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
                                className="px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
                                Back
                            </button>
                        )}
                        {step < 4 ? (
                            <button onClick={() => {
                                if (step === 1 && !selectedImage) { setError('Please upload a photo first'); return; }
                                if (step === 2 && !title) { setError('Please enter a title'); return; }
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
