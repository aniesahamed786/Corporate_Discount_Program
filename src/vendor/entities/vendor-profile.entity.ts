import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity('VENDOR_PROFILE')
export class VendorProfile {
  @PrimaryGeneratedColumn()
  id: number;
 
  @ManyToOne(() => Vendor, vendor => vendor.profile, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;
 
  @Column({ nullable: false })
  vendor_id: number;
 
  @Column({ nullable: true })
  profile_image_url: string;
 
  @Column({ type: 'date', nullable: true })
  dob: Date;
}