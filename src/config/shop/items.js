export let shopItems = [
    {
        id: 'extra_work',
        name: 'Extra Work Shift',
        xpPrice: 500,
        description: 'Allows 1 extra use of the `/work` command.',
        type: 'consumable',
        maxQuantity: 5,
        cooldown: 86400000,
        effect: { type: 'command_boost', command: 'work', uses: 1 }
    },
    {
        id: 'bank_upgrade_1',
        name: 'Bank Upgrade I',
        xpPrice: 1500,
        description: 'Increases bank capacity and allows more funds to be deposited.',
        type: 'upgrade',
        maxLevel: 5,
        effect: { type: 'bank_capacity', multiplier: 1.5 }
    },
    {
        id: 'diamond_pickaxe',
        name: 'Diamond Pickaxe',
        xpPrice: 5000,
        description: 'Increases yield from `/mine`',
        type: 'tool',
        durability: 100,
        effect: { type: 'mining_yield', multiplier: 2.0 }
    },
    {
        id: 'premium_role',
        name: 'Premium Server Role',
        xpPrice: 1500,
        description: 'A special role granting a fancy color and a 10% daily bonus.',
        type: 'role',
        roleId: null,
        effect: { type: 'daily_bonus', multiplier: 1.1 }
    },
    {
        id: 'lucky_clover',
        name: 'Lucky Clover',
        xpPrice: 1000,
        description: 'Increases the chance of winning a higher payout on `/gamble` once.',
        type: 'consumable',
        maxQuantity: 10,
        effect: { type: 'gamble_boost', multiplier: 1.5, uses: 1 }
    },
    {
        id: 'fishing_rod',
        name: '🎣 Fishing Rod',
        xpPrice: 500,
        description: 'Used for fishing commands',
        type: 'tool',
        durability: 100,
        effect: { type: 'fishing_yield', multiplier: 1.0 }
    },
    {
        id: 'pickaxe',
        name: '⛏️ Pickaxe',
        xpPrice: 750,
        description: 'Used for mining commands',
        type: 'tool',
        durability: 100,
        effect: { type: 'mining_yield', multiplier: 1.2 }
    },
    {
        id: 'laptop',
        name: '💻 Laptop',
        xpPrice: 1500,
        description: 'Increases work earnings',
        type: 'tool',
        durability: 200,
        effect: { type: 'work_yield', multiplier: 1.5 }
    },
    {
        id: 'lucky_charm',
        name: '🍀 Lucky Charm',
        xpPrice: 1000,
        description: 'Increases luck for gambling. Has 3 uses before being consumed.',
        type: 'consumable',
        maxQuantity: 10,
        effect: { type: 'gamble_boost', multiplier: 1.3, uses: 3 }
    },
    {
        id: 'bank_note',
        name: '📜 Bank Note',
        xpPrice: 2500,
        description: 'Increases bank capacity by 10,000. Can be purchased multiple times.',
        type: 'tool',
        durability: null,
        effect: { type: 'bank_capacity', increase: 10000 }
    },
    {
        id: 'personal_safe',
        name: '🔒 Personal Safe',
        xpPrice: 3000,
        description: 'Protects your money from theft. Prevents others from robbing you.',
        type: 'tool',
        durability: null,
        effect: { type: 'robbery_protection', protection: true }
    }
];

export function getItemById(itemId) {
    return shopItems.find(item => item.id === itemId);
}

export function getItemsByType(type) {
    return shopItems.filter(item => item.type === type);
}

export function getItemXpPrice(itemId) {
    const item = getItemById(itemId);
    return item ? item.xpPrice : 0;
}

// פונקציה לעדכון מחיר מתוך פקודת דיסקורד
export function updateItemPrice(itemId, newXpPrice) {
    const item = getItemById(itemId);
    if (!item) return { success: false, reason: 'Item not found' };
    item.xpPrice = newXpPrice;
    return { success: true, item };
}
