import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity('VENDOR_CREDENTIALS')
export class VendorCredentials {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, vendor => vendor.credentials, { onDelete: 'CASCADE' })
  vendor: Vendor;

  @Column()
  username: string;

  @Column()
  password_hash: string;
}
