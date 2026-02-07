// Re-export from unsplash service for backward compatibility
export {
    getFoodImage,
    getCanteenImage,
    getDefaultFoodImage,
    getDefaultCanteenImage,
    searchFoodImage,
    searchCanteenImage,
    FOOD_IMAGE_MAP,
    CANTEEN_IMAGE_MAP,
} from '../services/unsplashService';

// Category images
export const getCategoryImage = (category) => {
    const CATEGORY_IMAGES = {
        breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=400&fit=crop',
        lunch: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=400&fit=crop',
        snacks: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop',
        beverages: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop',
        desserts: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
    };

    if (!category) return CATEGORY_IMAGES.lunch;
    return CATEGORY_IMAGES[category.toLowerCase()] || CATEGORY_IMAGES.lunch;
};
