import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { VendorCreatedOffer } from './vendor-created-offer.entity';
import { SubCategory } from './sub-category.entity';

// @Entity('VENDOR_OFFER_SUB_CATEGORY')
// export class VendorOfferSubCategory {

//   @PrimaryColumn()
//   offer_id: number;

//   @PrimaryColumn()
//   sub_category_id: number;

//   @ManyToOne(() => VendorCreatedOffer, offer => offer.offer_id, {
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'offer_id' })
//   offer: VendorCreatedOffer;

//   @ManyToOne(() => SubCategory, sub => sub.sub_category_id)
//   @JoinColumn({ name: 'sub_category_id' })
//   subCategory: SubCategory;
// }

@Entity('VENDOR_OFFER_SUB_CATEGORY')

@Entity('VENDOR_OFFER_SUB_CATEGORY')
export class VendorOfferSubCategory {

  @PrimaryColumn()
  offer_id: number;

  @PrimaryColumn()
  sub_category_id: number;

  @ManyToOne(() => VendorCreatedOffer, offer => offer.offerSubCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'offer_id' })
  offer: VendorCreatedOffer;

  @ManyToOne(() => SubCategory, sub => sub.vendorOfferSubCategories)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategory;
}

