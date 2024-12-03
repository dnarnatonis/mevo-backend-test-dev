import { OperationData } from './entities/operation.data';
import { ValidationError } from 'yup';
export declare const SUSPICIOUS_ACTIVITY_THRESHOLD = 5000000;
export interface OperationDTO extends OperationData {
    suspiciousActivity: boolean;
}
export interface OperationError {
    data: OperationData;
    error: ValidationError | string | string[];
}
export interface OperationDataResults {
    success: OperationDTO[];
    errors: any;
}
export declare class OperationsService {
    processFileOperation(file: Express.Multer.File): Promise<OperationDataResults>;
    private extractOperationsFromFile;
    private validateOperationSchema;
}
