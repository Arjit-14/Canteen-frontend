import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

export const useWebSocket = (userId, canteenId, eventHandlers = {}) => {
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io(WS_URL, {
            transports: ['websocket', 'polling'],
        });

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('WebSocket connected');

            // Join appropriate rooms
            if (userId) {
                socket.emit('join-student', userId);
            }
            if (canteenId) {
                socket.emit('join-vendor', canteenId);
                socket.emit('join-cancelled-items', canteenId);
            }
        });

        // Register event handlers
        if (eventHandlers.onOrderUpdate) {
            socket.on('order-update', eventHandlers.onOrderUpdate);
        }
        if (eventHandlers.onNewOrder) {
            socket.on('new-order', eventHandlers.onNewOrder);
        }
        if (eventHandlers.onCancelledItem) {
            socket.on('cancelled-item-available', eventHandlers.onCancelledItem);
        }
        if (eventHandlers.onPrepReminder) {
            socket.on('prep-reminder', eventHandlers.onPrepReminder);
        }

        socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, [userId, canteenId]);

    const emit = useCallback((event, data) => {
        if (socketRef.current) {
            socketRef.current.emit(event, data);
        }
    }, []);

    return { emit };
};
