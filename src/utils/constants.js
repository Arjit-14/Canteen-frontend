// Frontend utility constants
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PREPARING: 'preparing',
    READY: 'ready',
    COLLECTED: 'collected',
    CANCELLED: 'cancelled'
};

export const MENU_CATEGORIES = [
    'Breakfast',
    'Lunch',
    'Snacks',
    'Beverages',
    'Desserts'
];

export const STATUS_COLORS = {
    pending: 'yellow',
    confirmed: 'blue',
    preparing: 'orange',
    ready: 'green',
    collected: 'gray',
    cancelled: 'red'
};
