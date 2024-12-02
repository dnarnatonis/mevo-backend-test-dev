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

  // @Post()
  // create(@Body() createOperationDto: CreateOperationDto) {
  //   return this.operationsService.create(createOperationDto);
  // }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: file.buffer.toString(),
    };
  }

  // @Get()
  // findAll() {
  //   return new NotImplementedException();
  // }

  // @Get(':id')
  // findOne(@Param('id') _id: string) {
  //   return new NotImplementedException();
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') _id: string,
  // ) {
  //   return new NotImplementedException();
  // }

  // @Delete(':id')
  // remove(@Param('id') _id: string) {
  //   return new NotImplementedException();
  // }
}
