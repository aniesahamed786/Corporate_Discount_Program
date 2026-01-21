"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const request_entity_1 = require("../vendor/entities/request.entity");
const enum_1 = require("../Common/enum");
const vendor_entity_1 = require("../vendor/entities/vendor.entity");
let AdminService = class AdminService {
    datasource;
    requestRepo;
    vendorRepo;
    constructor(datasource, requestRepo, vendorRepo) {
        this.datasource = datasource;
        this.requestRepo = requestRepo;
        this.vendorRepo = vendorRepo;
    }
    async getAllRequests() {
        return await this.requestRepo.find({
            relations: ['vendor'],
            order: { created_at: 'DESC' },
        });
    }
    async getRequestsByVendor(vendorId) {
        return await this.requestRepo.find({
            where: {
                vendor: { id: vendorId },
            },
            relations: ['vendor'],
            order: { created_at: 'DESC' },
        });
    }
    async getRequestById(id) {
        const request = await this.requestRepo.findOne({
            where: { request_id: id },
            relations: ['vendor'],
        });
        if (!request) {
            throw new common_1.NotFoundException('Request not found');
        }
        return request;
    }
    async approveRequest(request_id, AdminId) {
        const request = await this.requestRepo.findOne({ where: { request_id: request_id } });
        if (!request) {
            throw new common_1.NotFoundException('Request id not found' + `${request_id}`);
        }
        return await this.datasource.transaction(async (manager) => {
            const payload = request.payload;
            switch (request.request_type) {
                case 'vendor_registration': {
                    const vendor = this.vendorRepo.create({
                        name: payload.name,
                        email: payload.email,
                        business_name: payload.business_name,
                        mobile_phone: payload.mobile_phone,
                        address: payload.address,
                        status: enum_1.VendorRegistrationStatus.APPROVED,
                        admin: { id: AdminId }
                    });
                    await manager.save(vendor);
                    await manager.update(request_entity_1.Request, request_id, { vendor: { id: vendor.id, status: vendor.status }, });
                    break;
                }
            }
        });
    }
    create(createAdminDto) {
        return 'This action adds a new admin';
    }
    findAll() {
        return `This action returns all admin`;
    }
    async GetVendorList() {
        try {
            const queryText = `SELECT * FROM "public"."Vendor";`;
            const result = await this.datasource.query(queryText);
            return result;
        }
        catch (error) {
            console.error('Error fetching vendor details:', error.message);
            throw new Error('Failed to fetch vendor details: ' + error.message);
        }
    }
    async getVendorById(id) {
        try {
            const queryText = `SELECT * FROM "public"."Vendor" WHERE id = $1`;
            const result = await this.datasource.query(queryText, [id]);
            return result;
        }
        catch (error) {
            console.error('Error fetching vendor details:', error.message);
            throw new Error('Failed to fetch vendor details: ' + error.message);
        }
    }
    findOne(id) {
        return `This action returns a #${id} admin`;
    }
    update(id, updateAdminDto) {
        return `This action updates a #${id} admin`;
    }
    remove(id) {
        return `This action removes a #${id} admin`;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __param(1, (0, typeorm_2.InjectRepository)(request_entity_1.Request)),
    __param(2, (0, typeorm_2.InjectRepository)(vendor_entity_1.Vendor)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map