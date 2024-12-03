/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse';
import { OperationData } from './entities/operation.data';
import { OPERATION_FILE_SCHEMA } from './validators/operationsFile.schema';
import { ValidationError } from 'yup';

export const SUSPICIOUS_ACTIVITY_THRESHOLD = 5000000
export interface OperationDTO extends OperationData {
  suspiciousActivity: boolean
}

export interface OperationError {
  data: OperationData,
  error: ValidationError | string | string[]
}

export interface OperationDataResults {
  success: OperationDTO[]
  errors: any
  // errors: { data: OperationData, errors: any[] }[]
}

@Injectable()
export class OperationsService {
  async processFileOperation(file: Express.Multer.File): Promise<OperationDataResults> {
    const fileContent: string = file.buffer.toString()
    const parsedData: OperationData[] = await this.extractOperationsFromFile(fileContent)

    const operationsResults: OperationDataResults = { errors: [], success: [] }
    const successfulOperations: Map<string, boolean> = new Map()

    for (const data of parsedData) {
      try {
        const operationData = { ...data, amount: Number(data.amount ?? null) }
        await this.validateOperationSchema(data)

        const hasDuplicated: boolean =
          successfulOperations.get(`${operationData.from}:${operationData.to}:${operationData.amount}`) ?? false

        if(hasDuplicated) {
          throw ({ data, error:  ['Duplicated operation'] } as OperationError)
        }

        successfulOperations.set(`${operationData.from}:${operationData.to}:${operationData.amount}`, true)
        const suspiciousActivity = operationData.amount > SUSPICIOUS_ACTIVITY_THRESHOLD
        
        operationsResults.success.push({ ...operationData, suspiciousActivity })
      } catch(err) {
        const { data, error } = err as unknown as OperationError
        operationsResults.errors.push({ data, errors: error })
      }
    }
    return operationsResults
  }

  private async extractOperationsFromFile(fileContent: string): Promise<OperationData[]> {
    return new Promise((resolve, reject) => {
      try {
        parse(
          fileContent,
          { columns: true },
          (error, output) => {
            if(error) reject(error)
            resolve(output)
          }
        )
      } catch(error) {
        reject(error)
      }
    })
  }

  private async validateOperationSchema(data: OperationData): Promise<void> {
    try {
      await OPERATION_FILE_SCHEMA.validate(data)
    } catch(error) {
      throw { data, error } as OperationError
    }
  }
}
