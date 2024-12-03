/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationsModule } from './operations/operations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationEntity, OperationErrorEntity } from './operations/entities/operation.entity';

@Module({
  imports: [
    OperationsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [OperationEntity,OperationErrorEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
