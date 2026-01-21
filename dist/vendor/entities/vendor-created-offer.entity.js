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
exports.VendorCreatedOffer = void 0;
const typeorm_1 = require("typeorm");
const vendor_entity_1 = require("./vendor.entity");
const enum_1 = require("../../Common/enum");
const category_entity_1 = require("./category.entity");
const sub_category_entity_1 = require("./sub-category.entity");
let VendorCreatedOffer = class VendorCreatedOffer {
    offer_id;
    vendor;
    title;
    short_description;
    status;
    start_date;
    end_date;
    timestamp;
    categories;
    subCategories;
};
exports.VendorCreatedOffer = VendorCreatedOffer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VendorCreatedOffer.prototype, "offer_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor, vendor => vendor.offers, { onDelete: 'CASCADE' }),
    __metadata("design:type", vendor_entity_1.Vendor)
], VendorCreatedOffer.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VendorCreatedOffer.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], VendorCreatedOffer.prototype, "short_description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.VendorOfferCreationStatus,
    }),
    __metadata("design:type", String)
], VendorCreatedOffer.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], VendorCreatedOffer.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], VendorCreatedOffer.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VendorCreatedOffer.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.Category),
    (0, typeorm_1.JoinTable)({
        name: 'VENDOR_OFFER_CATEGORY',
        joinColumn: { name: 'offer_id' },
        inverseJoinColumn: { name: 'category_id' },
    }),
    __metadata("design:type", Array)
], VendorCreatedOffer.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => sub_category_entity_1.SubCategory),
    (0, typeorm_1.JoinTable)({
        name: 'VENDOR_OFFER_SUB_CATEGORY',
        joinColumn: { name: 'offer_id' },
        inverseJoinColumn: { name: 'sub_category_id' },
    }),
    __metadata("design:type", Array)
], VendorCreatedOffer.prototype, "subCategories", void 0);
exports.VendorCreatedOffer = VendorCreatedOffer = __decorate([
    (0, typeorm_1.Entity)('VENDOR_CREATED_OFFER')
], VendorCreatedOffer);
//# sourceMappingURL=vendor-created-offer.entity.js.map