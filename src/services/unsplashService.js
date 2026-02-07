import { createApi } from 'unsplash-js';

// Create Unsplash API instance
// Get your free API key from: https://unsplash.com/developers
const unsplash = createApi({
    accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY',
});

// Cache to store fetched images (avoid duplicate API calls)
const imageCache = new Map();

/**
 * Search for a food image on Unsplash
 * @param {string} query - Search term (e.g., 'biryani', 'coffee')
 * @returns {Promise<string>} - Image URL
 */
export const searchFoodImage = async (query) => {
    // Check cache first
    const cacheKey = `food_${query.toLowerCase()}`;
    if (imageCache.has(cacheKey)) {
        return imageCache.get(cacheKey);
    }

    try {
        const result = await unsplash.search.getPhotos({
            query: `${query} food`,
            page: 1,
            perPage: 1,
            orientation: 'squarish',
        });

        if (result.response?.results?.length > 0) {
            const imageUrl = result.response.results[0].urls.small;
            imageCache.set(cacheKey, imageUrl);
            return imageUrl;
        }
    } catch (error) {
        console.error('Unsplash API error:', error);
    }

    // Fallback - return a default food image
    return getDefaultFoodImage();
};

/**
 * Search for a canteen/restaurant image on Unsplash
 * @param {string} query - Search term (e.g., 'cafeteria', 'restaurant')
 * @returns {Promise<string>} - Image URL
 */
export const searchCanteenImage = async (query) => {
    const cacheKey = `canteen_${query.toLowerCase()}`;
    if (imageCache.has(cacheKey)) {
        return imageCache.get(cacheKey);
    }

    try {
        const result = await unsplash.search.getPhotos({
            query: `${query} restaurant cafeteria`,
            page: 1,
            perPage: 1,
            orientation: 'landscape',
        });

        if (result.response?.results?.length > 0) {
            const imageUrl = result.response.results[0].urls.regular;
            imageCache.set(cacheKey, imageUrl);
            return imageUrl;
        }
    } catch (error) {
        console.error('Unsplash API error:', error);
    }

    return getDefaultCanteenImage();
};

/**
 * Get a default food image (no API call)
 */
export const getDefaultFoodImage = () => {
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop';
};

/**
 * Get a default canteen image (no API call)
 */
export const getDefaultCanteenImage = () => {
    return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop';
};

// Pre-mapped food images for common items (faster loading, no API call needed)
export const FOOD_IMAGE_MAP = {
    // Indian Breakfast
    'idli': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=400&fit=crop',
    'idli sambar': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=400&fit=crop',
    'dosa': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=400&fit=crop',
    'masala dosa': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=400&fit=crop',
    'poha': 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=400&fit=crop',
    'paratha': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop',
    'aloo paratha': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop',
    'upma': 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=400&fit=crop',
    'bread omelette': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop',
    'omelette': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop',

    // Main Course
    'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=400&fit=crop',
    'chicken biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=400&fit=crop',
    'veg biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=400&fit=crop',
    'rice': 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=400&fit=crop',
    'fried rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop',
    'veg fried rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop',
    'noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
    'maggi noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
    'maggi': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
    'cup noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop',
    'curry': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop',
    'egg curry': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop',
    'egg curry rice': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop',
    'thali': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop',
    'veg thali': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop',
    'roti': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop',
    'paneer': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop',
    'paneer butter masala': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop',
    'dal': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop',
    'dal rice': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop',
    'chole bhature': 'https://images.unsplash.com/photo-1626132647523-66c994590042?w=400&h=400&fit=crop',
    'rajma chawal': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop',

    // Snacks
    'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop',
    'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
    'pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    'sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop',
    'fries': 'https://images.unsplash.com/photo-1630384060421-cb20aed73045?w=400&h=400&fit=crop',
    'french fries': 'https://images.unsplash.com/photo-1630384060421-cb20aed73045?w=400&h=400&fit=crop',
    'puff': 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=400&fit=crop',
    'vada pav': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=400&fit=crop',
    'pav bhaji': 'https://images.unsplash.com/photo-1626132647523-66c994590042?w=400&h=400&fit=crop',
    'momos': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=400&fit=crop',
    'spring roll': 'https://images.unsplash.com/photo-1603033172853-d4b9af31c3df?w=400&h=400&fit=crop',
    'bread pakora': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop',
    'chips': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop',
    'biscuit': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
    'biscuit packet': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',

    // Beverages
    'coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
    'filter coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
    'cold coffee': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
    'hot chocolate': 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=400&fit=crop',
    'tea': 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop',
    'chai': 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop',
    'masala chai': 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop',
    'lassi': 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=400&fit=crop',
    'mango lassi': 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=400&fit=crop',
    'juice': 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400&h=400&fit=crop',
    'smoothie': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=400&fit=crop',
    'milkshake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop',
    'lemonade': 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop',
    'buttermilk': 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=400&fit=crop',

    // Desserts
    'ice cream': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop',
    'cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    'cake slice': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    'brownie': 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=400&fit=crop',
    'gulab jamun': 'https://images.unsplash.com/photo-1666190077584-0a91d4349b70?w=400&h=400&fit=crop',
    'rasgulla': 'https://images.unsplash.com/photo-1666190077632-97f35f99eabb?w=400&h=400&fit=crop',
    'pastry': 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=400&fit=crop',
    'jalebi': 'https://images.unsplash.com/photo-1666190077632-97f35f99eabb?w=400&h=400&fit=crop',
};

// Canteen image map
export const CANTEEN_IMAGE_MAP = {
    'main': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    'cafe': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    'express': 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop',
    'food court': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
};

/**
 * Get food image - tries mapped image first, then API
 * @param {string} itemName - Name of the food item
 * @returns {string} - Image URL (synchronous for mapped, async for API)
 */
export const getFoodImage = (itemName) => {
    if (!itemName) return getDefaultFoodImage();

    const name = itemName.toLowerCase().trim();

    // Check exact match
    if (FOOD_IMAGE_MAP[name]) {
        return FOOD_IMAGE_MAP[name];
    }

    // Check partial match
    for (const [key, url] of Object.entries(FOOD_IMAGE_MAP)) {
        if (name.includes(key) || key.includes(name)) {
            return url;
        }
    }

    // Return default for now (API can be called separately if needed)
    return getDefaultFoodImage();
};

/**
 * Get canteen image based on name
 * @param {string} canteenName - Name of the canteen
 * @returns {string} - Image URL
 */
export const getCanteenImage = (canteenName) => {
    if (!canteenName) return getDefaultCanteenImage();

    const name = canteenName.toLowerCase();

    for (const [key, url] of Object.entries(CANTEEN_IMAGE_MAP)) {
        if (name.includes(key)) {
            return url;
        }
    }

    return getDefaultCanteenImage();
};

export default unsplash;
