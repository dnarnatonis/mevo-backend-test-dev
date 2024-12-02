/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotImplementedException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { OperationsService } from './operations.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { CreateOperationDto } from './dto/create-operation.dto';
// import { UpdateOperationDto } from './dto/update-operation.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: await this.operationsService.processFileOperation(file)
    };
  }
}
