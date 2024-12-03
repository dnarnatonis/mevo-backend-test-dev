import { OperationsService } from './operations.service';
export declare class OperationsController {
    private readonly operationsService;
    constructor(operationsService: OperationsService);
    uploadFile(file: Express.Multer.File): Promise<{
        file: import("./operations.service").OperationDataResults;
    }>;
}
