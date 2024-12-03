"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsService = exports.SUSPICIOUS_ACTIVITY_THRESHOLD = void 0;
const common_1 = require("@nestjs/common");
const csv_parse_1 = require("csv-parse");
const operationsFile_schema_1 = require("./validators/operationsFile.schema");
exports.SUSPICIOUS_ACTIVITY_THRESHOLD = 5000000;
let OperationsService = class OperationsService {
    async processFileOperation(file) {
        const fileContent = file.buffer.toString();
        const parsedData = await this.extractOperationsFromFile(fileContent);
        const operationsResults = { errors: [], success: [] };
        const successfulOperations = new Map();
        for (const data of parsedData) {
            try {
                const operationData = { ...data, amount: Number(data.amount ?? null) };
                await this.validateOperationSchema(data);
                const hasDuplicated = successfulOperations.get(`${operationData.from}:${operationData.to}:${operationData.amount}`) ?? false;
                if (hasDuplicated) {
                    throw { data, error: ['Duplicated operation'] };
                }
                successfulOperations.set(`${operationData.from}:${operationData.to}:${operationData.amount}`, true);
                const suspiciousActivity = operationData.amount > exports.SUSPICIOUS_ACTIVITY_THRESHOLD;
                operationsResults.success.push({ ...operationData, suspiciousActivity });
            }
            catch (err) {
                const { data, error } = err;
                operationsResults.errors.push({ data, errors: error });
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
};
exports.OperationsService = OperationsService;
exports.OperationsService = OperationsService = __decorate([
    (0, common_1.Injectable)()
], OperationsService);
//# sourceMappingURL=operations.service.js.map