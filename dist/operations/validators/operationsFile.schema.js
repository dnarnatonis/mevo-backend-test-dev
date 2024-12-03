"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATION_FILE_SCHEMA = void 0;
const yup_1 = require("yup");
exports.OPERATION_FILE_SCHEMA = (0, yup_1.object)({
    from: (0, yup_1.string)().length(13).required(),
    to: (0, yup_1.string)().length(13).required(),
    amount: (0, yup_1.number)().positive().required(),
});
//# sourceMappingURL=operationsFile.schema.js.map