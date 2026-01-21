import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DataSource, Repository } from 'typeorm';
import { Request } from '../vendor/entities/request.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { VendorProfile } from 'src/vendor/entities/vendor-profile.entity';
import { VendorCredentials } from 'src/vendor/entities/vendor-credentials.entity';
import { Category } from 'src/vendor/entities/category.entity';
import { SubCategory } from 'src/vendor/entities/sub-category.entity';
import { VendorCreatedOffer } from 'src/vendor/entities/vendor-created-offer.entity';
export declare class AdminService {
    private datasource;
    private requestRepo;
    private vendorRepo;
    private vendorProfileRepo;
    private vendorCredentialsRepo;
    private vendorCreatedOfferRepo;
    private categoryRepo;
    private subCategoryRepo;
    constructor(datasource: DataSource, requestRepo: Repository<Request>, vendorRepo: Repository<Vendor>, vendorProfileRepo: Repository<VendorProfile>, vendorCredentialsRepo: Repository<VendorCredentials>, vendorCreatedOfferRepo: Repository<VendorCreatedOffer>, categoryRepo: Repository<Category>, subCategoryRepo: Repository<SubCategory>);
    getAllRequests(): Promise<Request[]>;
    generateSecurePassword(length?: number): string;
    generateRandomUsername(prefix: string): string;
    getRequestsByVendor(vendorId: number): Promise<Request[]>;
    getRequestById(id: number): Promise<Request>;
    approveRequest(request_id: number, AdminId: any): Promise<{
        message: string;
    }>;
    rejectRequest(request_id: number, AdminId: any, adminComment: string): Promise<{
        message: string;
    }>;
    create(createAdminDto: CreateAdminDto): string;
    findAll(): string;
    GetVendorList(): Promise<any>;
    getVendorById(id: number): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateAdminDto: UpdateAdminDto): string;
    remove(id: number): string;
}
