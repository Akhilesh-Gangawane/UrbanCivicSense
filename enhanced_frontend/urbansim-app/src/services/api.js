// UrbanSim AI — Supabase-powered API Service
import { supabase } from './supabaseClient';

// ML Backend (kept for AI prediction endpoints only)
const ML_BACKEND_URL = 'http://localhost:8000';

// ─── Auth API (Supabase Auth) ───
export const authAPI = {
    login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
        // Fetch profile from public.users
        const profile = await _getProfileByAuthId(data.user.id);
        return {
            access_token: data.session.access_token,
            user: { ...data.user, ...profile },
        };
    },

    signup: async ({ email, password, full_name, mobile_number, is_admin = false }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name, mobile_number, is_admin },
            },
        });
        if (error) throw new Error(error.message);
        // DB trigger auto-creates public.users row from user_metadata
        return {
            access_token: data.session?.access_token,
            user: { ...data.user, full_name, mobile_number, is_admin },
        };
    },

    getProfile: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');
        return _getProfileByAuthId(user.id);
    },

    updateProfile: async (updates) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();
        if (error) throw new Error(error.message);
        return data;
    },

    signOut: async () => {
        await supabase.auth.signOut();
    },
};

async function _getProfileByAuthId(authId) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authId)
        .single();
    if (error) return { id: authId };
    return data;
}

// ─── Reports API ───
const REPORT_SELECT = '*, categories(id, name), statuses(id, name), departments(id, name), users(id, full_name, email)';

export const reportsAPI = {
    getAll: async (skip = 0, limit = 100) => {
        const { data, error } = await supabase
            .from('reports')
            .select(REPORT_SELECT)
            .range(skip, skip + limit - 1)
            .order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        return _normalizeReports(data);
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('reports')
            .select(REPORT_SELECT)
            .eq('id', id)
            .single();
        if (error) throw new Error(error.message);
        return _normalizeReport(data);
    },

    create: async (report) => {
        const { data: { user } } = await supabase.auth.getUser();
        const insertData = {
            title: report.title,
            description: report.description,
            category_id: report.category_id || null,
            status_id: 1, // "New"
            department_id: report.department_id || null,
            user_id: user?.id || null,
            location_lat: report.location_lat,
            location_long: report.location_long,
            location_address: report.location_address,
            prediction_confidence: report.prediction_confidence || null,
            is_auto_assigned: report.is_auto_assigned || false,
            priority: report.priority || 'medium',
        };
        const { data, error } = await supabase
            .from('reports')
            .insert(insertData)
            .select(REPORT_SELECT)
            .single();
        if (error) throw new Error(error.message);
        return _normalizeReport(data);
    },

    update: async (id, updates) => {
        const { data, error } = await supabase
            .from('reports')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select(REPORT_SELECT)
            .single();
        if (error) throw new Error(error.message);
        return _normalizeReport(data);
    },
};

// Normalize a Supabase report row to flat shape expected by pages
function _normalizeReport(r) {
    if (!r) return r;
    return {
        ...r,
        category: r.categories?.name || null,
        status: r.statuses?.name || 'New',
        department: r.departments?.name || null,
        user_name: r.users?.full_name || 'Anonymous',
        user_email: r.users?.email || null,
    };
}
function _normalizeReports(rows) {
    return (rows || []).map(_normalizeReport);
}

// ─── Dashboard API ───
export const dashboardAPI = {
    getSummary: async () => {
        const { count: total } = await supabase.from('reports').select('*', { count: 'exact', head: true });
        const { count: resolved } = await supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status_id', 4);
        const { count: inProgress } = await supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status_id', 3);
        return {
            public_stats: {
                total_reports: total || 0,
                resolved: resolved || 0,
                in_progress: inProgress || 0,
                pending: (total || 0) - (resolved || 0) - (inProgress || 0),
            },
        };
    },
};

// ─── Admin API ───
export const adminAPI = {
    getMapIssues: async (statusFilter) => {
        let query = supabase.from('reports').select(REPORT_SELECT);
        if (statusFilter && statusFilter !== 'all') {
            // Find status id by name
            const { data: sts } = await supabase.from('statuses').select('id').eq('name', statusFilter).single();
            if (sts) query = query.eq('status_id', sts.id);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw new Error(error.message);
        return _normalizeReports(data);
    },
};

// ─── Department API ───
export const departmentAPI = {
    getAll: async () => {
        const { data, error } = await supabase.from('departments').select('*').order('id');
        if (error) throw new Error(error.message);
        return data;
    },
};

// ─── AI Prediction API (still uses ML backend) ───
export const predictionAPI = {
    predictText: async (text) => {
        const res = await fetch(`${ML_BACKEND_URL}/predict/text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error('Prediction failed');
        return res.json();
    },

    predictImage: async (formData) => {
        const res = await fetch(`${ML_BACKEND_URL}/predict/image`, {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) throw new Error('Image prediction failed');
        return res.json();
    },
};

// ─── Categories & Statuses (from Supabase) ───
export const metaAPI = {
    getCategories: async () => {
        const { data, error } = await supabase.from('categories').select('*').order('id');
        if (error) throw new Error(error.message);
        return data;
    },
    getStatuses: async () => {
        const { data, error } = await supabase.from('statuses').select('*').order('id');
        if (error) throw new Error(error.message);
        return data;
    },
    getDepartments: async () => {
        const { data, error } = await supabase.from('departments').select('*').order('id');
        if (error) throw new Error(error.message);
        return data;
    },
};
