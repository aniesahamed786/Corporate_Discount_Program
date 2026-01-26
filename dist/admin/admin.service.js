"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const vendor_profile_entity_1 = require("../vendor/entities/vendor-profile.entity");
const vendor_credentials_entity_1 = require("../vendor/entities/vendor-credentials.entity");
const category_entity_1 = require("../vendor/entities/category.entity");
const sub_category_entity_1 = require("../vendor/entities/sub-category.entity");
const vendor_created_offer_entity_1 = require("../vendor/entities/vendor-created-offer.entity");
const request_history_entity_1 = require("../vendor/entities/request-history.entity");
const crypto = __importStar(require("crypto"));
let AdminService = class AdminService {
    datasource;
    requestRepo;
    vendorRepo;
    vendorProfileRepo;
    vendorCredentialsRepo;
    vendorCreatedOfferRepo;
    categoryRepo;
    subCategoryRepo;
    constructor(datasource, requestRepo, vendorRepo, vendorProfileRepo, vendorCredentialsRepo, vendorCreatedOfferRepo, categoryRepo, subCategoryRepo) {
        this.datasource = datasource;
        this.requestRepo = requestRepo;
        this.vendorRepo = vendorRepo;
        this.vendorProfileRepo = vendorProfileRepo;
        this.vendorCredentialsRepo = vendorCredentialsRepo;
        this.vendorCreatedOfferRepo = vendorCreatedOfferRepo;
        this.categoryRepo = categoryRepo;
        this.subCategoryRepo = subCategoryRepo;
    }
    async getAllRequests() {
        return await this.requestRepo.find({
            relations: ['vendor'],
            order: { created_at: 'DESC' },
        });
    }
    generateSecurePassword(length = 12) {
        return crypto.randomBytes(length).toString('base64').slice(0, length);
    }
    generateRandomUsername(prefix) {
        const random = crypto.randomBytes(3).toString('hex');
        return `${prefix.toLowerCase()}_${random}`;
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
        const request = await this.requestRepo.findOne({ where: { request_id: request_id }, relations: ['vendor'], });
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
                    await manager.update(request_entity_1.Request, request_id, { vendor: { id: vendor.id, status: enum_1.VendorRegistrationStatus.APPROVED }, });
                    const credentialsRepo = manager.getRepository(vendor_credentials_entity_1.VendorCredentials);
                    const updateVendorCredentials = credentialsRepo.create({
                        vendor: { id: vendor.id },
                        username: this.generateRandomUsername('vendor'),
                        password_hash: this.generateSecurePassword(),
                    });
                    await credentialsRepo.save(updateVendorCredentials);
                    break;
                }
                case 'vendor_update': {
                    await manager.update(vendor_entity_1.Vendor, request.target_id, {
                        ...payload,
                        status: 'approved',
                    });
                    break;
                }
                case 'profile_create': {
                    if (!request.vendor?.id) {
                        throw new common_1.BadRequestException('Vendor not linked to request');
                    }
                    const profile = this.vendorProfileRepo.create({
                        vendor: { id: request.vendor_id },
                        profile_image_url: payload.profile_image_url,
                        dob: payload.dob,
                    });
                    await manager.save(profile);
                    break;
                }
                case 'profile_update': {
                    await manager.update(vendor_profile_entity_1.VendorProfile, request.target_id, {
                        ...payload,
                    });
                    break;
                }
                case 'offer_create': {
                    await manager.update(request_entity_1.Request, request_id, { vendor: { id: request.target_id, status: enum_1.VendorRegistrationStatus.APPROVED }, });
                    const categories = await this.categoryRepo.find({
                        where: { category_id: (0, typeorm_1.In)(payload.categories) },
                    });
                    if (categories.length !== payload.categories.length) {
                        const foundCategoryIds = categories.map(cat => cat.category_id);
                        const missingCategoryIds = payload.categories.filter(id => !foundCategoryIds.includes(id));
                        throw new common_1.NotFoundException(`Categories with IDs ${missingCategoryIds.join(', ')} not found.`);
                    }
                    const offer = this.vendorCreatedOfferRepo.create({
                        vendor: { id: request.vendor?.id },
                        title: payload.title,
                        short_description: payload.short_description,
                        start_date: payload.start_date,
                        end_date: payload.end_date,
                        status: enum_1.VendorOfferCreationStatus.APPROVED,
                        offer_image: request.payload.offer_image
                    });
                    await manager.save(offer);
                    if (payload.categories > 0) {
                        const insertPromises = payload.categories.map(async (catId) => {
                            const queryText = `
              INSERT INTO "public"."VENDOR_OFFER_CATEGORY" (offer_id, category_id)
              VALUES ($1, $2)
              ON CONFLICT (offer_id, category_id) DO NOTHING;
            `;
                            await this.datasource.query(queryText, [offer.offer_id, catId]);
                        });
                        await Promise.all(insertPromises);
                    }
                    break;
                }
                case 'offer_update': {
                    await manager.update(vendor_created_offer_entity_1.VendorCreatedOffer, request.target_id, {
                        ...payload,
                        timestamp: new Date(),
                    });
                    break;
                }
                case 'offer_delete': {
                    await manager.delete(vendor_created_offer_entity_1.VendorCreatedOffer, request.target_id);
                    break;
                }
            }
            await manager.update(request_entity_1.Request, request_id, {
                status: enum_1.RequestStatusEnum.APPROVED,
                updated_at: new Date(),
            });
            await manager.save(request_history_entity_1.RequestHistory, {
                request: { request_id: request_id },
                admin: { id: AdminId },
                action: enum_1.RequestStatusEnum.APPROVED,
                comment: request.admin_comment,
            });
            return { message: 'Request approved successfully' };
        });
    }
    async rejectRequest(request_id, AdminId, adminComment) {
        const request = await this.requestRepo.findOne({
            where: { request_id },
            relations: ['vendor'],
        });
        if (!request) {
            throw new common_1.NotFoundException('Request id not found' + `${request_id}`);
        }
        return await this.datasource.transaction(async (manager) => {
            await manager.update(request_entity_1.Request, request_id, {
                status: enum_1.RequestStatusEnum.REJECTED,
                admin_comment: adminComment,
                updated_at: new Date(),
            });
            await manager.save(request_history_entity_1.RequestHistory, {
                request: { request_id },
                admin: { id: AdminId },
                action: enum_1.RequestStatusEnum.REJECTED,
                admin_comment: adminComment || null,
            });
            return { message: 'Request rejected successfully' };
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
    __param(3, (0, typeorm_2.InjectRepository)(vendor_profile_entity_1.VendorProfile)),
    __param(4, (0, typeorm_2.InjectRepository)(vendor_credentials_entity_1.VendorCredentials)),
    __param(5, (0, typeorm_2.InjectRepository)(vendor_created_offer_entity_1.VendorCreatedOffer)),
    __param(6, (0, typeorm_2.InjectRepository)(category_entity_1.Category)),
    __param(7, (0, typeorm_2.InjectRepository)(sub_category_entity_1.SubCategory)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map