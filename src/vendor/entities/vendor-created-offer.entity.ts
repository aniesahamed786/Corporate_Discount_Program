import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Vendor } from './vendor.entity';
import { VendorOfferCreationStatus } from '../../Common/enum';
import { Category } from './category.entity';
import { SubCategory } from './sub-category.entity';

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

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'VENDOR_OFFER_CATEGORY',
    joinColumn: { name: 'offer_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];

  @ManyToMany(() => SubCategory)
  @JoinTable({
    name: 'VENDOR_OFFER_SUB_CATEGORY',
    joinColumn: { name: 'offer_id' },
    inverseJoinColumn: { name: 'sub_category_id' },
  })
  subCategories: SubCategory[];
}
