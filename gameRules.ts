
export const GAME_RULES = {
    TRUST: {
        TIERS: {
            NEWBIE: { min: 0, max: 29, label: 'Newbie' },
            VERIFIED: { min: 30, max: 79, label: 'Verified Pro' },
            ELITE: { min: 80, max: 98, label: 'Elite' },
            LEGEND: { min: 99, max: 100, label: 'Legend' }
        },
        REWARDS: {
            REVIEW_COMPLETION: 5,
        }
    },
    FEES: {
        INNER_CIRCLE_SERVICE_FEE: 2.50,
    },
    URGENCY: {
        STANDARD: { multiplier: 1.0, label: 'Standard', sub: 'Kein Zuschlag' },
        SOS_LEVEL_1: { multiplier: 1.25, label: 'SOS Tier 1', sub: '+25% Boost' },
        SOS_LEVEL_2: { multiplier: 1.50, label: 'SOS Tier 2', sub: '+50% Notfall' },
        SOS_LEVEL_3: { multiplier: 2.00, label: 'SOS Tier 3', sub: '+100% Kritisch' },
    },
    RENTAL: {
        PRICING: {
            MORNING: 25,
            AFTERNOON: 35,
            PRIME: 50
        },
        MIN_TRUST_LEVEL: 'ELITE' as const,
    }
};
