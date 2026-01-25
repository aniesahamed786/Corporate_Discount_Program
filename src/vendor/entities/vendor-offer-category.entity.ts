import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VendorCreatedOffer } from './vendor-created-offer.entity';
import { Category } from './category.entity';

@Entity('VENDOR_OFFER_CATEGORY')
export class VendorOfferCategory {

  @PrimaryColumn()
  offer_id: number;

  @PrimaryColumn()
  category_id: number;

  @ManyToOne(() => VendorCreatedOffer, offer => offer.offerCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'offer_id' })
  offer: VendorCreatedOffer;

  @ManyToOne(() => Category, category => category.vendorOfferCategories)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
