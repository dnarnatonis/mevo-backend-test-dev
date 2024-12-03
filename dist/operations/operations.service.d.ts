import { OperationData } from './entities/operation.data';
import { ValidationError } from 'yup';
import { OperationEntity, OperationErrorEntity } from './entities/operation.entity';
import { Repository } from 'typeorm';
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
    private readonly operationRepository;
    private readonly operationErrorRepository;
    constructor(operationRepository: Repository<OperationEntity>, operationErrorRepository: Repository<OperationErrorEntity>);
    processFileOperation(file: Express.Multer.File): Promise<OperationDataResults>;
    private extractOperationsFromFile;
    private validateOperationSchema;
    private isAmmountSuspicious;
}
