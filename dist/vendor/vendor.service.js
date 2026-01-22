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
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const vendor_entity_1 = require("./entities/vendor.entity");
const vendor_profile_entity_1 = require("./entities/vendor-profile.entity");
const vendor_credentials_entity_1 = require("./entities/vendor-credentials.entity");
const vendor_created_offer_entity_1 = require("./entities/vendor-created-offer.entity");
const category_entity_1 = require("./entities/category.entity");
const sub_category_entity_1 = require("./entities/sub-category.entity");
const request_entity_1 = require("./entities/request.entity");
const enum_1 = require("../Common/enum");
let VendorService = class VendorService {
    datasource;
    vendorRepo;
    vendorProfileRepo;
    vendorCredentialsRepo;
    vendorCreatedOfferRepo;
    categoryRepo;
    subCategoryRepo;
    vendorRequestRepo;
    constructor(datasource, vendorRepo, vendorProfileRepo, vendorCredentialsRepo, vendorCreatedOfferRepo, categoryRepo, subCategoryRepo, vendorRequestRepo) {
        this.datasource = datasource;
        this.vendorRepo = vendorRepo;
        this.vendorProfileRepo = vendorProfileRepo;
        this.vendorCredentialsRepo = vendorCredentialsRepo;
        this.vendorCreatedOfferRepo = vendorCreatedOfferRepo;
        this.categoryRepo = categoryRepo;
        this.subCategoryRepo = subCategoryRepo;
        this.vendorRequestRepo = vendorRequestRepo;
    }
    async createVendor(vendorData) {
        const queryText = `
      INSERT INTO "public"."Vendor" (admin_id, name, email, address, business_name, mobile_phone, status)
      VALUES (
          (SELECT "id" FROM "public"."Admin" WHERE username = $1), -- Parameter for adminUsername
          $2, -- Parameter for name
          $3, -- Parameter for email
          $4, -- Parameter for address
          $5, -- Parameter for business_name
          $6, -- Parameter for mobile_phone
          $7  -- Parameter for status
      )
      RETURNING id,'; -- Optional: return the ID of the newly inserted vendor
    `;
        const queryParams = [
            vendorData.admin_id,
            vendorData.name,
            vendorData.email,
            vendorData.address,
            vendorData.business_name,
            vendorData.mobile_phone,
            vendorData.status,
        ];
        try {
            const result = await this.datasource.query(queryText, queryParams);
            return result;
        }
        catch (error) {
            console.error('Error creating vendor:', error.message);
            throw new Error('Failed to create vendor: ' + error.message);
        }
    }
    async GetVendorDetails(vendor_id) {
        try {
            const queryText = `SELECT * FROM "public"."Vendor" WHERE id = $1`;
            const result = await this.datasource.query(queryText, [vendor_id]);
            return result;
        }
        catch (error) {
            console.error('Error fetching vendor details:', error.message);
            throw new Error('Failed to fetch vendor details: ' + error.message);
        }
    }
    async updateVendorDetailsById(vendor_id, vendorData) {
        const queryText = `
      INSERT INTO "public"."Vendor" (admin_id, name, email, address, business_name, mobile_phone, status)
      VALUES (
          (SELECT "id" FROM "public"."Admin" WHERE username = $1), -- Parameter for adminUsername
          $2, -- Parameter for name
          $3, -- Parameter for email
          $4, -- Parameter for address
          $5, -- Parameter for business_name
          $6, -- Parameter for mobile_phone
          $7  -- Parameter for status
      )
      RETURNING id,'; -- Optional: return the ID of the newly inserted vendor
    `;
        const queryParams = [
            vendorData.admin_id,
            vendorData.name,
            vendorData.email,
            vendorData.address,
            vendorData.business_name,
            vendorData.mobile_phone,
            vendorData.status,
        ];
        try {
            const result = await this.datasource.query(queryText, queryParams);
            return result;
        }
        catch (error) {
            console.error('Error creating vendor:', error.message);
            throw new Error('Failed to create vendor: ' + error.message);
        }
    }
    findAll() {
        return `This action returns all vendor`;
    }
    findOne(id) {
        return `This action returns a #${id} vendor`;
    }
    update(id, updateVendorDto) {
        return `This action updates a #${id} vendor`;
    }
    remove(id) {
        return `This action removes a #${id} vendor`;
    }
    async createNewVendor(vendorDetails) {
        try {
            const result = await this.datasource.query('SELECT * FROM "public"."Admin"');
            return result;
        }
        catch (error) {
            return error;
        }
    }
    async createVendorRequest(dto) {
        const tableMap = {
            'vendor_registration': 'Vendor',
            'vendor_update': 'Vendor',
            'profile_create': 'VENDOR_PROFILE',
            'profile_update': 'PROFILE_PROFILE',
            'offer_create': 'VENDOR_CREATED_OFFER',
            'offer_update': 'VENDOR_CREATED_OFFER',
            'offer_delete': 'VENDOR_CREATED_OFFER',
            'update_crtedentials': "VENDOR_CREDENTIALS"
        };
        const targettable = tableMap[dto.request_type];
        const vendorId = dto.target_id || null;
        const request = this.vendorRequestRepo.create({
            vendor_id: dto.request_type !== 'vendor_registration' ? vendorId : null,
            request_type: dto.request_type,
            target_table: targettable,
            target_id: dto.target_id,
            payload: dto.payload,
            status: enum_1.RequestStatusEnum.PENDING,
        });
        return await this.vendorRequestRepo.save(request);
    }
    async getApprovedOffers() {
        const today = new Date().toISOString().split('T')[0];
        const offers = await this.vendorCreatedOfferRepo
            .createQueryBuilder('offer')
            .leftJoinAndSelect('offer.vendor', 'vendor')
            .leftJoinAndSelect('offer.categories', 'categories')
            .leftJoinAndSelect('offer.subCategories', 'subCategories')
            .where('offer.status = :status', {
            status: enum_1.VendorOfferCreationStatus.APPROVED,
        })
            .andWhere('offer.start_date <= :today', { today })
            .andWhere('offer.end_date >= :today', { today })
            .orderBy('offer.timestamp', 'DESC')
            .getMany();
        return {
            success: true,
            count: offers.length,
            data: offers,
        };
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __param(1, (0, typeorm_2.InjectRepository)(vendor_entity_1.Vendor)),
    __param(2, (0, typeorm_2.InjectRepository)(vendor_profile_entity_1.VendorProfile)),
    __param(3, (0, typeorm_2.InjectRepository)(vendor_credentials_entity_1.VendorCredentials)),
    __param(4, (0, typeorm_2.InjectRepository)(vendor_created_offer_entity_1.VendorCreatedOffer)),
    __param(5, (0, typeorm_2.InjectRepository)(category_entity_1.Category)),
    __param(6, (0, typeorm_2.InjectRepository)(sub_category_entity_1.SubCategory)),
    __param(7, (0, typeorm_2.InjectRepository)(request_entity_1.Request)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], VendorService);
//# sourceMappingURL=vendor.service.js.map