import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { DataSource, Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { VendorProfile } from './entities/vendor-profile.entity';
import { VendorCredentials } from './entities/vendor-credentials.entity';
import { VendorCreatedOffer } from './entities/vendor-created-offer.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { CreateRequestDto } from './dto/createRequest.dto';
import { Request } from './entities/request.entity';
export declare class VendorService {
    private datasource;
    private vendorRepo;
    private vendorProfileRepo;
    private vendorCredentialsRepo;
    private vendorCreatedOfferRepo;
    private categoryRepo;
    private subCategoryRepo;
    private vendorRequestRepo;
    constructor(datasource: DataSource, vendorRepo: Repository<Vendor>, vendorProfileRepo: Repository<VendorProfile>, vendorCredentialsRepo: Repository<VendorCredentials>, vendorCreatedOfferRepo: Repository<VendorCreatedOffer>, categoryRepo: Repository<Category>, subCategoryRepo: Repository<SubCategory>, vendorRequestRepo: Repository<Request>);
    createVendor(vendorData: CreateVendorDto): Promise<any>;
    GetVendorDetails(vendor_id: number): Promise<any>;
    updateVendorDetailsById(vendor_id: number, vendorData: UpdateVendorDto): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVendorDto: UpdateVendorDto): string;
    remove(id: number): string;
    createNewVendor(vendorDetails: CreateVendorDto): Promise<any>;
    createVendorRequest(dto: CreateRequestDto): Promise<Request>;
    getApprovedOffers(): Promise<{
        success: boolean;
        count: any;
        data: any;
    }>;
    getApprovedOffersByVendorId(vendorId: number): Promise<{
        success: boolean;
        count: any;
        data: any;
    }>;
}
