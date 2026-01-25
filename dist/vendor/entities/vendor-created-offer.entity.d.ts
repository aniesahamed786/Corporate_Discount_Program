import { Vendor } from './vendor.entity';
import { VendorOfferCreationStatus } from '../../Common/enum';
import { VendorOfferCategory } from './vendor-offer-category.entity';
import { VendorOfferSubCategory } from './vendor-offer-sub-category.entity';
export declare class VendorCreatedOffer {
    offer_id: number;
    vendor: Vendor;
    title: string;
    short_description: string;
    status: VendorOfferCreationStatus;
    start_date: Date;
    end_date: Date;
    timestamp: Date;
    offerCategories: VendorOfferCategory[];
    offerSubCategories: VendorOfferSubCategory[];
}
