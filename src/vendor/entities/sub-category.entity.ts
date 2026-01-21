import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity('SUB_CATEGORY')
export class SubCategory {

  @PrimaryGeneratedColumn()
  sub_category_id: number;

  @ManyToOne(() => Category)
  category: Category;

  @Column()
  name_en: string;

  @Column()
  name_ar: string;
}
