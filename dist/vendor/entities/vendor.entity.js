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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../../admin/entities/admin.entity");
const enum_1 = require("../../Common/enum");
const vendor_credentials_entity_1 = require("./vendor-credentials.entity");
const vendor_profile_entity_1 = require("./vendor-profile.entity");
const store_location_entity_1 = require("./store-location.entity");
const vendor_created_offer_entity_1 = require("./vendor-created-offer.entity");
let Vendor = class Vendor {
    id;
    admin;
    name;
    email;
    address;
    business_name;
    mobile_phone;
    status;
    created_at;
    credentials;
    profile;
    locations;
    offers;
};
exports.Vendor = Vendor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vendor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, admin => admin.vendors),
    __metadata("design:type", admin_entity_1.Admin)
], Vendor.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vendor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Vendor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vendor.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vendor.prototype, "business_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vendor.prototype, "mobile_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.VendorRegistrationStatus,
    }),
    __metadata("design:type", String)
], Vendor.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vendor.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vendor_credentials_entity_1.VendorCredentials, cred => cred.vendor),
    __metadata("design:type", Array)
], Vendor.prototype, "credentials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vendor_profile_entity_1.VendorProfile, profile => profile.vendor),
    __metadata("design:type", Array)
], Vendor.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_location_entity_1.StoreLocation, location => location.vendor),
    __metadata("design:type", Array)
], Vendor.prototype, "locations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vendor_created_offer_entity_1.VendorCreatedOffer, offer => offer.vendor),
    __metadata("design:type", Array)
], Vendor.prototype, "offers", void 0);
exports.Vendor = Vendor = __decorate([
    (0, typeorm_1.Entity)('Vendor')
], Vendor);
//# sourceMappingURL=vendor.entity.js.map