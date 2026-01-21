import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Vendor } from '../../vendor/entities/vendor.entity';
import { RequestHistory } from '../../vendor/entities/request-history.entity';

@Entity('Admin')
export class Admin {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  username: string;

  @Column()
  password_hash: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Vendor, vendor => vendor.admin)
  vendors: Vendor[];

  @OneToMany(() => RequestHistory, history => history.admin)
  requestHistory: RequestHistory[];
}
