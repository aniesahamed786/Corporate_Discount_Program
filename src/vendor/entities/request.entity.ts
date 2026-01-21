import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Vendor } from './vendor.entity';
import { RequestStatusEnum, RequestTypeEnum } from '../../Common/enum';

@Entity('REQUESTS')
export class Request {

  @PrimaryGeneratedColumn()
  request_id: number;

  @ManyToOne(() => Vendor, { nullable: true, onDelete: 'SET NULL' })
  vendor?: Vendor;

  @Column({
    type: 'enum',
    enum: RequestTypeEnum,
  })
  request_type: RequestTypeEnum;

  @Column()
  target_table: string;

  @Column({ nullable: true })
  target_id: number;

  @Column({ type: 'jsonb' })
  payload: any;

  @Column({
    type: 'enum',
    enum: RequestStatusEnum,
    default: RequestStatusEnum.PENDING,
  })
  status: RequestStatusEnum;

  @Column({ nullable: true })
  admin_comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
