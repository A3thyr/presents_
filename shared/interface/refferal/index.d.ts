
export interface Refferal {
    refferalsProfit: number;
    totalRefferals: {
        first_name: string,
        username: string
    }[],
    userProfit: number;
}

export interface Level {
    level: number;
    nameKey: string;
    percent: number;
    requiredRefs: number;
    requiredTon: number;
}