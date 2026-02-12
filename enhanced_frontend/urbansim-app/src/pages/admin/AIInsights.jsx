import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { predictionAPI } from '../../services/api';

export default function AIInsights() {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handlePredict() {
        if (!text.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const data = await predictionAPI.predictText(text);
            setResult(data);
        } catch (err) {
            setError('Prediction service is unavailable. Make sure the ML backend is running.');
        }
        setLoading(false);
    }

    const deptInfo = {
        'Public Works Department': { icon: '🏗️', color: '#F97316' },
        'Electrical Department': { icon: '💡', color: '#EAB308' },
        'Water Supply Department': { icon: '💧', color: '#3B82F6' },
        'Solid Waste Management': { icon: '🗑️', color: '#22C55E' },
        'Urban Health Department': { icon: '🏥', color: '#EF4444' },
    };

    return (
        <AdminLayout>
            <div className="max-w-md mx-auto px-4 pt-6 pb-20 space-y-6">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Insights</h1>
                        <p className="text-xs text-gray-500">ML-powered predictions</p>
                    </div>
                    <Link to="/admin" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500">
                        <span className="material-icons-round">arrow_back</span>
                    </Link>
                </header>

                {/* Prediction Playground */}
                <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <span className="material-icons-round text-primary text-lg">psychology</span>
                        Text Prediction
                    </h3>
                    <textarea className="w-full bg-gray-50 dark:bg-[#27272E] border-transparent rounded-xl text-sm py-3 px-4 placeholder-gray-400 resize-none focus:ring-1 focus:ring-primary shadow-sm"
                        rows={3} placeholder="Describe an issue, e.g. 'There is a large pothole on MG Road near the junction...'"
                        value={text} onChange={(e) => setText(e.target.value)} />
                    <button onClick={handlePredict} disabled={loading || !text.trim()}
                        className="mt-3 w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <span className="material-icons-round text-lg">auto_awesome</span>
                                Predict Department
                            </>
                        )}
                    </button>
                </section>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                        <span className="material-icons-round">error_outline</span>
                        {error}
                    </div>
                )}

                {result && (
                    <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-5 shadow-sm">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Prediction Result</h3>
                        <div className="text-center py-4">
                            <p className="text-3xl mb-2">{deptInfo[result.department]?.icon || '🏛️'}</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{result.department || 'Unknown'}</p>
                            {result.confidence && (
                                <div className="mt-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(result.confidence * 100).toFixed(0)}%` }}></div>
                                </div>
                            )}
                            {result.confidence && (
                                <p className="text-xs text-gray-500 mt-1">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
                            )}
                        </div>
                    </section>
                )}

                {/* Model Info */}
                <section className="bg-white dark:bg-[#1C1C21] rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <span className="material-icons-round text-primary text-lg">model_training</span>
                        Models
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Text Classifier', desc: 'Scikit-Learn NB / SVM', icon: 'article', status: 'Active' },
                            { name: 'Image Classifier', desc: 'TensorFlow CNN', icon: 'image', status: 'Active' },
                        ].map(m => (
                            <div key={m.name} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#27272E] rounded-xl">
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <span className="material-icons-round text-primary text-lg">{m.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{m.name}</p>
                                    <p className="text-[10px] text-gray-500">{m.desc}</p>
                                </div>
                                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{m.status}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
