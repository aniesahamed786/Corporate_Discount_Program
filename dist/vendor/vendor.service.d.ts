import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { DataSource } from 'typeorm';
export declare class VendorService {
    private datasource;
    constructor(datasource: DataSource);
    createVendor(vendorData: CreateVendorDto): Promise<any>;
    GetVendorDetails(vendor_id: number): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVendorDto: UpdateVendorDto): string;
    remove(id: number): string;
    createNewVendor(vendorDetails: CreateVendorDto): Promise<any>;
}
