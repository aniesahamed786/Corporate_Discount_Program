import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';
import { VendorRegistrationStatus } from '../../Common/enum';
import { VendorCredentials } from './vendor-credentials.entity';
import { VendorProfile } from './vendor-profile.entity';
import { StoreLocation } from './store-location.entity';
import { VendorCreatedOffer } from './vendor-created-offer.entity';

@Entity('Vendor')
export class Vendor {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Admin, admin => admin.vendors)
  admin: Admin;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  business_name: string;

  @Column()
  mobile_phone: string;

  @Column({
    type: 'enum',
    enum: VendorRegistrationStatus,
  })
  status: VendorRegistrationStatus;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => VendorCredentials, cred => cred.vendor)
  credentials: VendorCredentials[];

  @OneToMany(() => VendorProfile, profile => profile.vendor)
  profile: VendorProfile[];

  @OneToMany(() => StoreLocation, location => location.vendor)
  locations: StoreLocation[];

  @OneToMany(() => VendorCreatedOffer, offer => offer.vendor)
  offers: VendorCreatedOffer[];
}
