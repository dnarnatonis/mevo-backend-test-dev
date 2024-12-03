/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationEntity, OperationErrorEntity } from './entities/operation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperationEntity,OperationErrorEntity])],
  controllers: [OperationsController],
  providers: [OperationsService],
})
export class OperationsModule {}
