export declare class OperationEntity {
    id: number;
    to: string;
    from: string;
    amount: number;
    suspiciousActivity: boolean;
}
export declare class OperationErrorEntity {
    id: number;
    to: string;
    from: string;
    amount: number;
    errors: string;
}
