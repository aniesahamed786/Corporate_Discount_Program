import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Request } from './request.entity';
import { Admin } from '../../admin/entities/admin.entity';
import { RequestStatusEnum } from '../../Common/enum';

@Entity('REQUEST_HISTORY')
export class RequestHistory {

  @PrimaryGeneratedColumn()
  history_id: number;

   @ManyToOne(() => Request, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'request_id' }) // ✅ VERY IMPORTANT
  request: Request;

  @ManyToOne(() => Admin, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'admin_id' }) // ✅ VERY IMPORTANT
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
