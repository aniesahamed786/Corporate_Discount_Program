import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubCategory } from './sub-category.entity';

// @Entity('CATEGORY')
// export class Category {

//   @PrimaryGeneratedColumn()
//   category_id: number;

//   @Column()
//   name_en: string;

//   @Column()
//   name_ar: string;
// }

// @Entity('CATEGORY')
// export class Category {

//   @PrimaryGeneratedColumn()
//   category_id: number;

//   @Column()
//   name_en: string;

//   @Column()
//   name_ar: string;

//   // 🔥 Required for relation mapping
//   @OneToMany(() => SubCategory, sub => sub.category)
//   subCategories: SubCategory[];
// }

@Entity('CATEGORY')
export class Category {

  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name_en: string;

  @Column()
  name_ar: string;
}
