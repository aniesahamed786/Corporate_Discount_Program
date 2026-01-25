import { VendorCreatedOffer } from './vendor-created-offer.entity';
import { SubCategory } from './sub-category.entity';
export declare class VendorOfferSubCategory {
    offer_id: number;
    sub_category_id: number;
    offer: VendorCreatedOffer;
    subCategory: SubCategory;
}
