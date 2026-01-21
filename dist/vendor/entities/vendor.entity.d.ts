import { Admin } from '../../admin/entities/admin.entity';
import { VendorRegistrationStatus } from '../../Common/enum';
import { VendorCredentials } from './vendor-credentials.entity';
import { VendorProfile } from './vendor-profile.entity';
import { StoreLocation } from './store-location.entity';
import { VendorCreatedOffer } from './vendor-created-offer.entity';
export declare class Vendor {
    id: number;
    admin: Admin;
    name: string;
    email: string;
    address: string;
    business_name: string;
    mobile_phone: string;
    status: VendorRegistrationStatus;
    created_at: Date;
    credentials: VendorCredentials[];
    profile: VendorProfile[];
    locations: StoreLocation[];
    offers: VendorCreatedOffer[];
}
