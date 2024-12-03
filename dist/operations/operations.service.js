"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsService = exports.SUSPICIOUS_ACTIVITY_THRESHOLD = void 0;
const common_1 = require("@nestjs/common");
const csv_parse_1 = require("csv-parse");
const operationsFile_schema_1 = require("./validators/operationsFile.schema");
const typeorm_1 = require("@nestjs/typeorm");
const operation_entity_1 = require("./entities/operation.entity");
const typeorm_2 = require("typeorm");
exports.SUSPICIOUS_ACTIVITY_THRESHOLD = 5000000;
let OperationsService = class OperationsService {
    constructor(operationRepository, operationErrorRepository) {
        this.operationRepository = operationRepository;
        this.operationErrorRepository = operationErrorRepository;
    }
    async processFileOperation(file) {
        const fileContent = file.buffer.toString();
        const parsedData = await this.extractOperationsFromFile(fileContent);
        const operationsResults = { errors: [], success: [] };
        const successfulOperations = new Map();
        for (const data of parsedData) {
            const operationData = { ...data, amount: Number(data.amount ?? null), suspiciousActivity: false };
            try {
                await this.validateOperationSchema(data);
                const hasDuplicated = successfulOperations.get(`${operationData.from}:${operationData.to}:${operationData.amount}`) ?? false;
                if (hasDuplicated) {
                    throw { data, error: ['Duplicated operation'] };
                }
                operationData.suspiciousActivity = await this.isAmmountSuspicious(operationData.amount);
                await this.operationRepository.save(operationData);
                successfulOperations.set(`${operationData.from}:${operationData.to}:${operationData.amount}`, true);
                operationsResults.success.push(operationData);
            }
            catch (err) {
                const { error } = err;
                operationsResults.errors.push({ data: operationData, errors: error });
                this.operationErrorRepository.save({ ...operationData, errors: `${error}` });
            }
        }
        return operationsResults;
    }
    async extractOperationsFromFile(fileContent) {
        return new Promise((resolve, reject) => {
            try {
                (0, csv_parse_1.parse)(fileContent, { columns: true }, (error, output) => {
                    if (error)
                        reject(error);
                    resolve(output);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async validateOperationSchema(data) {
        try {
            await operationsFile_schema_1.OPERATION_FILE_SCHEMA.validate(data);
        }
        catch (error) {
            throw { data, error };
        }
    }
    async isAmmountSuspicious(amount) {
        return amount > exports.SUSPICIOUS_ACTIVITY_THRESHOLD;
    }
};
exports.OperationsService = OperationsService;
exports.OperationsService = OperationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(operation_entity_1.OperationEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(operation_entity_1.OperationErrorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OperationsService);
//# sourceMappingURL=operations.service.js.map