import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): string;
    ReviewRequest(createAdminDto: CreateAdminDto): string;
    findAll(): Promise<any>;
    getAllRequests(): Promise<import("../vendor/entities/request.entity").Request[]>;
    approve(id: number, updateAdminDto: UpdateAdminDto): Promise<void>;
    findOne(id: number): Promise<any>;
    update(id: string, updateAdminDto: UpdateAdminDto): string;
    remove(id: string): string;
}
