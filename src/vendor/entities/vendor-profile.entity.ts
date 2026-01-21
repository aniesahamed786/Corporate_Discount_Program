import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity('VENDOR_PROFILE')
export class VendorProfile {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, vendor => vendor.profile, { onDelete: 'CASCADE' })
  vendor: Vendor;

  @Column({ nullable: true })
  profile_image_url: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;
}
