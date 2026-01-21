import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { RejectApproveDto } from './dto/rejectApprove.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): string;
    ReviewRequest(createAdminDto: CreateAdminDto): string;
    findAll(): Promise<any>;
    getAllRequests(): Promise<import("../vendor/entities/request.entity").Request[]>;
    approve(id: number, updateAdminDto: UpdateAdminDto): Promise<{
        message: string;
    }>;
    reject(id: number, RejectApproveDto: RejectApproveDto): Promise<{
        message: string;
    }>;
    findOne(id: number): Promise<any>;
    update(id: string, updateAdminDto: UpdateAdminDto): string;
    remove(id: string): string;
}
