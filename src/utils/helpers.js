// Frontend utility helpers

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatCurrency = (amount) => {
    return `₹${amount}`;
};

export const getTimeFromNow = (date) => {
    const diff = new Date(date) - new Date();
    const minutes = Math.round(diff / 60000);

    if (minutes < 0) return 'Now';
    if (minutes < 60) return `${minutes} min`;

    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
};

export const truncateText = (text, maxLength = 50) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};
