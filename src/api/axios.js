import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
    getMe: () => api.get('/auth/me'),
};

// Canteen API
export const canteenAPI = {
    getAll: () => api.get('/canteens'),
    getById: (id) => api.get(`/canteens/${id}`),
};

// Menu API
export const menuAPI = {
    getByCanteen: (canteenId) => api.get(`/menu/${canteenId}`),
    getItem: (id) => api.get(`/menu/item/${id}`),
};

// Order API
export const orderAPI = {
    create: (data) => api.post('/orders', data),
    getMyOrders: () => api.get('/orders'),
    getById: (id) => api.get(`/orders/${id}`),
    cancel: (id, reason) => api.post(`/orders/${id}/cancel`, { reason }),
    getTimeSlots: (canteenId) => api.get(`/orders/slots/${canteenId}`),
};

// Vendor API
export const vendorAPI = {
    getOrders: (canteenId, status) =>
        api.get(`/vendor/orders/${canteenId}${status ? `?status=${status}` : ''}`),
    updateStatus: (orderId, status) =>
        api.patch(`/vendor/orders/${orderId}/status`, { status }),
    scanQR: (qrToken) => api.post('/vendor/scan-qr', { qrToken }),
    getCancelledItems: (canteenId) => api.get(`/vendor/cancelled/${canteenId}`),
    claimItem: (itemId) => api.post(`/vendor/cancelled/${itemId}/claim`),
};

export default api;
