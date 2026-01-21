import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity('STORE_LOCATION')
export class StoreLocation {

  @PrimaryGeneratedColumn()
  location_id: number;

  @ManyToOne(() => Vendor, vendor => vendor.locations, { onDelete: 'CASCADE' })
  vendor: Vendor;

  @Column()
  address: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;
}
