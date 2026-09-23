import { getItemById, getItemXpPrice, shopItems } from './items.js';

/**
 * הגדרות כלליות של החנות
 */
export const shopConfig = {
    enabled: true,
    currencySymbol: '⚡',
    currencyName: 'XP',
    maxItemsPerPurchase: 10
};

/**
 * פונקציה לבדיקת תקינות הרכישה (בדיקת XP, מלאי, שדרוגים ותפקידים)
 * @param {string} itemId - מזהה הפריט
 * @param {object} userData - אובייקט נתוני המשתמש (חייב להכיל שדה xp או xpBalance)
 * @returns {object} { valid: boolean, reason?: string }
 */
export function validatePurchase(itemId, userData) {
    // 1. בדיקה אם הפריט קיים בחנות
    const item = getItemById(itemId);
    if (!item) {
        return { valid: false, reason: 'הפריט לא נמצא בחנות.' };
    }

    // 2. בדיקה אם למשתמש יש מספיק XP
    const userXp = userData.xp || userData.xpBalance || 0;
    if (userXp < item.xpPrice) {
        return { 
            valid: false, 
            reason: `אין לך מספיק XP לרכישת פריט זה! מחיר הפריט הוא ${item.xpPrice} XP, וכרגע יש לך ${userXp} XP.` 
        };
    }

    const inventory = userData.inventory || {};
    const upgrades = userData.upgrades || {};

    // 3. בדיקת מגבלת כמות לפריטים מתכלים (Consumables)
    if (item.type === 'consumable' && item.maxQuantity) {
        const currentQuantity = inventory[itemId] || 0;
        if (currentQuantity >= item.maxQuantity) {
            return { 
                valid: false, 
                reason: `אתה יכול להחזיק במקסימום ${item.maxQuantity} יחידות של ${item.name}.` 
            };
        }
    }

    // 4. בדיקה אם שדרוג כבר נרכש (Upgrades)
    if (item.type === 'upgrade' && item.maxLevel) {
        if (upgrades[itemId]) {
            return { 
                valid: false, 
                reason: `כבר רכשת את השדרוג ${item.name}.` 
            };
        }
    }

    // 5. בדיקת כלים/חפצים יחידניים (Tools)
    if (item.type === 'tool') {
        const currentQuantity = inventory[itemId] || 0;
        if (itemId !== 'bank_note' && currentQuantity > 0) {
            return { 
                valid: false, 
                reason: `כבר יש ברשותך את החפץ ${item.name}.` 
            };
        }
    }

    // 6. בדיקת תפקידים (Roles)
    if (item.type === 'role' && item.roleId) {
        if (userData.roles?.includes(item.roleId)) {
            return { 
                valid: false, 
                reason: `כבר יש לך את התפקיד ${item.name}.` 
            };
        }
    }

    return { valid: true };
}

/**
 * פונקציה לביצוע הרכישה (מורידה XP ומעדכנת את ה-Inventory)
 * @param {string} itemId - מזהה הפריט
 * @param {object} userData - אובייקט המשתמש
 * @returns {object} { success: boolean, updatedUser?: object, reason?: string }
 */
export function processPurchase(itemId, userData) {
    const validation = validatePurchase(itemId, userData);
    if (!validation.valid) {
        return { success: false, reason: validation.reason };
    }

    const item = getItemById(itemId);

    // הורדת המחיר ב-XP
    userData.xp = (userData.xp || userData.xpBalance || 0) - item.xpPrice;

    // עדכון המלאי
    if (!userData.inventory) userData.inventory = {};
    userData.inventory[itemId] = (userData.inventory[itemId] || 0) + 1;

    return {
        success: true,
        updatedUser: userData,
        item
    };
}
