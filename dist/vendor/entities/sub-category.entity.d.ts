import { Category } from './category.entity';
import { VendorOfferSubCategory } from './vendor-offer-sub-category.entity';
export declare class SubCategory {
    sub_category_id: number;
    category: Category;
    name_en: string;
    name_ar: string;
    vendorOfferSubCategories: VendorOfferSubCategory[];
}
