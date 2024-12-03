/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OperationEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ name: 'to', nullable: false })
  to: string

  @Column({ name: 'from', nullable: false })
  from: string

  @Column({ name: 'amount', nullable: false })
  amount: number

  @Column({ name: 'suspiciousActivity', nullable: false, default: false })
  suspiciousActivity: boolean
}

@Entity()
export class OperationErrorEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ name: 'to', nullable: false })
  to: string

  @Column({ name: 'from', nullable: false })
  from: string

  @Column({ name: 'amount', nullable: false })
  amount: number

  @Column({ name: 'errors', nullable: false })
  errors: string
}
