import { Vendor } from './vendor.entity';
import { VendorOfferCreationStatus } from '../../Common/enum';
import { Category } from './category.entity';
import { SubCategory } from './sub-category.entity';
export declare class VendorCreatedOffer {
    offer_id: number;
    vendor: Vendor;
    title: string;
    short_description: string;
    status: VendorOfferCreationStatus;
    start_date: Date;
    end_date: Date;
    timestamp: Date;
    categories: Category[];
    subCategories: SubCategory[];
}
