import { SubCategory } from './sub-category.entity';
import { VendorOfferCategory } from './vendor-offer-category.entity';
export declare class Category {
    category_id: number;
    name_en: string;
    name_ar: string;
    subCategories: SubCategory[];
    vendorOfferCategories: VendorOfferCategory[];
}
