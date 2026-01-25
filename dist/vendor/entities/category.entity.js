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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const sub_category_entity_1 = require("./sub-category.entity");
const vendor_offer_category_entity_1 = require("./vendor-offer-category.entity");
let Category = class Category {
    category_id;
    name_en;
    name_ar;
    subCategories;
    vendorOfferCategories;
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Category.prototype, "name_en", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Category.prototype, "name_ar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sub_category_entity_1.SubCategory, sub => sub.category),
    __metadata("design:type", Array)
], Category.prototype, "subCategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vendor_offer_category_entity_1.VendorOfferCategory, voc => voc.category),
    __metadata("design:type", Array)
], Category.prototype, "vendorOfferCategories", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)('CATEGORY')
], Category);
//# sourceMappingURL=category.entity.js.map