import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';
import { VendorRegistrationStatus } from '../../Common/enum';
import { VendorCredentials } from './vendor-credentials.entity';
import { VendorProfile } from './vendor-profile.entity';
import { StoreLocation } from './store-location.entity';
import { VendorCreatedOffer } from './vendor-created-offer.entity';
import { SubCategory } from './sub-category.entity';
import { Category } from './category.entity';

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


//    @ManyToMany(() => Category)
//   @JoinTable({
//     name: 'VENDOR_OFFER_CATEGORY',
//     joinColumn: {
//       name: 'offer_id',
//       referencedColumnName: 'offer_id'
//     },
//     inverseJoinColumn: {
//       name: 'category_id',
//       referencedColumnName: 'category_id'
//     }
//   })
//   categories: Category[];

//   // ✅ SUB CATEGORY JOIN TABLE MAPPING
//   @ManyToMany(() => SubCategory)
//   @JoinTable({
//     name: 'VENDOR_OFFER_SUB_CATEGORY',
//     joinColumn: {
//       name: 'offer_id',
//       referencedColumnName: 'offer_id'
//     },
//     inverseJoinColumn: {
//       name: 'sub_category_id',
//       referencedColumnName: 'sub_category_id'
//     }
//   })
//   subCategories: SubCategory[];
}
 