import { VendorCreatedOffer } from './vendor-created-offer.entity';
import { Category } from './category.entity';
export declare class VendorOfferCategory {
    offer_id: number;
    category_id: number;
    offer: VendorCreatedOffer;
    category: Category;
}
