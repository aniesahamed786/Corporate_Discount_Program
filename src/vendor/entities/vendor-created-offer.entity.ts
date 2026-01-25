import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Vendor } from './vendor.entity';
import { VendorOfferCreationStatus } from '../../Common/enum';
import { Category } from './category.entity';
import { SubCategory } from './sub-category.entity';
import { VendorOfferCategory } from './vendor-offer-category.entity';
import { VendorOfferSubCategory } from './vendor-offer-sub-category.entity';

@Entity('VENDOR_CREATED_OFFER')
export class VendorCreatedOffer {

  @PrimaryGeneratedColumn()
  offer_id: number;

  @ManyToOne(() => Vendor, vendor => vendor.offers, { onDelete: 'CASCADE' })
  vendor: Vendor;

  @Column()
  title: string;

  @Column('text')
  short_description: string;

  @Column({
    type: 'enum',
    enum: VendorOfferCreationStatus,
  })
  status: VendorOfferCreationStatus;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @CreateDateColumn()
  timestamp: Date;

   // ✅ OneToMany to mapping table
  @OneToMany(() => VendorOfferCategory, voc => voc.offer)
  offerCategories: VendorOfferCategory[];

  @OneToMany(() => VendorOfferSubCategory, vosc => vosc.offer)
  offerSubCategories: VendorOfferSubCategory[];

//   @ManyToMany(() => Category)
//   @JoinTable({
//     name: 'VENDOR_OFFER_CATEGORY',
//     joinColumn: { name: 'offer_id' },
//     inverseJoinColumn: { name: 'category_id' },
//   })
//   categories: Category[];

//   @ManyToMany(() => SubCategory)
//   @JoinTable({
//     name: 'VENDOR_OFFER_SUB_CATEGORY',
//     joinColumn: { name: 'offer_id' },
//     inverseJoinColumn: { name: 'sub_category_id' },
//   })
//   subCategories: SubCategory[];

   // ---------- CATEGORY JOIN TABLE ----------
//   @ManyToMany(() => Category)
//   @JoinTable({
//     name: 'vendor_offer_category',
//     joinColumn: {
//       name: 'offer_id',
//       referencedColumnName: 'offer_id',
//     },
//     inverseJoinColumn: {
//       name: 'category_id',
//       referencedColumnName: 'category_id',
//     },
//   })
//   categories: Category[];

//   // ---------- SUB CATEGORY JOIN TABLE ----------
//   @ManyToMany(() => SubCategory)
//   @JoinTable({
//     name: 'vendor_offer_sub_category',
//     joinColumn: {
//       name: 'offer_id',
//       referencedColumnName: 'offer_id',
//     },
//     inverseJoinColumn: {
//       name: 'sub_category_id',
//       referencedColumnName: 'sub_category_id',
//     },
//   })
//   subCategories: SubCategory[];
}
