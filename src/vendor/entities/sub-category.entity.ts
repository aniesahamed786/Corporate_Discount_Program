import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

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

@Entity('SUB_CATEGORY')
export class SubCategory {

  @PrimaryGeneratedColumn()
  sub_category_id: number;

  @ManyToOne(() => Category, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'category_id' }) // matches DB column
  category: Category;

  @Column()
  name_en: string;

  @Column()
  name_ar: string;
}
