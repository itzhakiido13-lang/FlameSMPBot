import './src/app.js';
export function validatePurchase(itemId, userData) {
    const item = getItemById(itemId);
    if (!item) {
        return { valid: false, reason: 'Item not found' };
    }

    // --- כאן בדיוק מציבים את הקוד החדש של ה-XP ---
    const userXp = userData.xp || 0;
    if (userXp < item.xpPrice) {
        return { 
            valid: false, 
            reason: `אין לך מספיק XP! המחיר הוא ${item.xpPrice} XP, ואצלך יש ${userXp} XP.` 
        };
    }
    // ----------------------------------------------

    const inventory = userData.inventory || {};
    const upgrades = userData.upgrades || {};

    if (item.type === 'consumable' && item.maxQuantity) {
        const currentQuantity = inventory[itemId] || 0;
        if (currentQuantity >= item.maxQuantity) {
            return { 
                valid: false, 
                reason: `You can only have a maximum of ${item.maxQuantity} ${item.name}s` 
            };
        }
    }

    // שאר הבדיקות של הפונקציה ממשיכות מכאן...
