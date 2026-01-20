import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DataSource } from 'typeorm';
export declare class AdminService {
    private datasource;
    constructor(datasource: DataSource);
    create(createAdminDto: CreateAdminDto): string;
    findAll(): string;
    GetVendorList(): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateAdminDto: UpdateAdminDto): string;
    remove(id: number): string;
}
