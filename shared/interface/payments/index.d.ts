
export interface Transaction {
    amount: string;
    created_at: string;
    id: number;
    status: "COMPLITED" | "OPEN" | "REJECTED";
    title: string;
    type: "TON" | "Stars"
}