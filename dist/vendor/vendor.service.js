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
let VendorService = class VendorService {
    datasource;
    constructor(datasource) {
        this.datasource = datasource;
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
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], VendorService);
//# sourceMappingURL=vendor.service.js.map