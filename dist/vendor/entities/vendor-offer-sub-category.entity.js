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
exports.VendorOfferSubCategory = void 0;
const typeorm_1 = require("typeorm");
const vendor_created_offer_entity_1 = require("./vendor-created-offer.entity");
const sub_category_entity_1 = require("./sub-category.entity");
let VendorOfferSubCategory = class VendorOfferSubCategory {
    offer_id;
    sub_category_id;
    offer;
    subCategory;
};
exports.VendorOfferSubCategory = VendorOfferSubCategory;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], VendorOfferSubCategory.prototype, "offer_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], VendorOfferSubCategory.prototype, "sub_category_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_created_offer_entity_1.VendorCreatedOffer, offer => offer.offerSubCategories, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'offer_id' }),
    __metadata("design:type", vendor_created_offer_entity_1.VendorCreatedOffer)
], VendorOfferSubCategory.prototype, "offer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sub_category_entity_1.SubCategory, sub => sub.vendorOfferSubCategories),
    (0, typeorm_1.JoinColumn)({ name: 'sub_category_id' }),
    __metadata("design:type", sub_category_entity_1.SubCategory)
], VendorOfferSubCategory.prototype, "subCategory", void 0);
exports.VendorOfferSubCategory = VendorOfferSubCategory = __decorate([
    (0, typeorm_1.Entity)('VENDOR_OFFER_SUB_CATEGORY'),
    (0, typeorm_1.Entity)('VENDOR_OFFER_SUB_CATEGORY')
], VendorOfferSubCategory);
//# sourceMappingURL=vendor-offer-sub-category.entity.js.map