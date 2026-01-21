import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Request } from './request.entity';
import { Admin } from '../../admin/entities/admin.entity';
import { RequestStatusEnum } from '../../Common/enum';

@Entity('REQUEST_HISTORY')
export class RequestHistory {

  @PrimaryGeneratedColumn()
  history_id: number;

  @ManyToOne(() => Request, { onDelete: 'CASCADE' })
  request: Request;

  @ManyToOne(() => Admin, { onDelete: 'SET NULL' })
  admin: Admin;

  @Column({
    type: 'enum',
    enum: RequestStatusEnum,
  })
  action: RequestStatusEnum;

  @Column('text', { nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}
