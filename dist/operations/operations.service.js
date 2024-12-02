"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsService = void 0;
const common_1 = require("@nestjs/common");
const csv_parse_1 = require("csv-parse");
let OperationsService = class OperationsService {
    async processFileOperation(file) {
        const fileContent = file.buffer.toString();
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
};
exports.OperationsService = OperationsService;
exports.OperationsService = OperationsService = __decorate([
    (0, common_1.Injectable)()
], OperationsService);
//# sourceMappingURL=operations.service.js.map