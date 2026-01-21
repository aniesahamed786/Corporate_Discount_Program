import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DataSource, Repository } from 'typeorm';
import { Request } from '../vendor/entities/request.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
export declare class AdminService {
    private datasource;
    private requestRepo;
    private vendorRepo;
    constructor(datasource: DataSource, requestRepo: Repository<Request>, vendorRepo: Repository<Vendor>);
    getAllRequests(): Promise<Request[]>;
    getRequestsByVendor(vendorId: number): Promise<Request[]>;
    getRequestById(id: number): Promise<Request>;
    approveRequest(request_id: number, AdminId: any): Promise<void>;
    create(createAdminDto: CreateAdminDto): string;
    findAll(): string;
    GetVendorList(): Promise<any>;
    getVendorById(id: number): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateAdminDto: UpdateAdminDto): string;
    remove(id: number): string;
}
