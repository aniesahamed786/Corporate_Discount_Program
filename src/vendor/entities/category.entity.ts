import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('CATEGORY')
export class Category {

  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name_en: string;

  @Column()
  name_ar: string;
}
