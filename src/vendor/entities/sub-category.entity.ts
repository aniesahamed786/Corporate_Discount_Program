import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { VendorOfferSubCategory } from './vendor-offer-sub-category.entity';

// @Entity('SUB_CATEGORY')
// export class SubCategory {

//   @PrimaryGeneratedColumn()
//   sub_category_id: number;

//   @ManyToOne(() => Category)
//   category: Category;

//   @Column()
//   name_en: string;

//   @Column()
//   name_ar: string;
// }

// @Entity('SUB_CATEGORY')
// export class SubCategory {

//   @PrimaryGeneratedColumn()
//   sub_category_id: number;

//   @ManyToOne(() => Category, category => category.subCategories)
//   @JoinColumn({ name: 'category_id' })  
//   category: Category;

//   @Column()
//   name_en: string;

//   @Column()
//   name_ar: string;
// }

// @Entity('SUB_CATEGORY')
// export class SubCategory {

//   @PrimaryGeneratedColumn()
//   sub_category_id: number;

//   @ManyToOne(() => Category, {
//     onDelete: 'CASCADE'
//   })
//   @JoinColumn({ name: 'category_id' }) // matches DB column
//   category: Category;

//   @Column()
//   name_en: string;

//   @Column()
//   name_ar: string;
// }


@Entity('SUB_CATEGORY')
export class SubCategory {

  @PrimaryGeneratedColumn()
  sub_category_id: number;

  @ManyToOne(() => Category, category => category.subCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  name_en: string;

  @Column()
  name_ar: string;

  @OneToMany(() => VendorOfferSubCategory, vosc => vosc.subCategory)
  vendorOfferSubCategories: VendorOfferSubCategory[];
}
