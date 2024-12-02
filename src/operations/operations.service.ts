/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse';

@Injectable()
export class OperationsService {
  async processFileOperation(file: Express.Multer.File) {
    const fileContent: string = file.buffer.toString()

    return new Promise((resolve, reject) => {
      try {
        parse(fileContent, {}, (error, output) => {
          if(error) reject(error)
          resolve(output)
        })
      } catch(error) {
        reject(error)
      }
    })
  }
}
