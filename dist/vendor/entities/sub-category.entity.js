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
exports.SubCategory = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const vendor_offer_sub_category_entity_1 = require("./vendor-offer-sub-category.entity");
let SubCategory = class SubCategory {
    sub_category_id;
    category;
    name_en;
    name_ar;
    vendorOfferSubCategories;
};
exports.SubCategory = SubCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubCategory.prototype, "sub_category_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.subCategories, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], SubCategory.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubCategory.prototype, "name_en", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubCategory.prototype, "name_ar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vendor_offer_sub_category_entity_1.VendorOfferSubCategory, vosc => vosc.subCategory),
    __metadata("design:type", Array)
], SubCategory.prototype, "vendorOfferSubCategories", void 0);
exports.SubCategory = SubCategory = __decorate([
    (0, typeorm_1.Entity)('SUB_CATEGORY')
], SubCategory);
//# sourceMappingURL=sub-category.entity.js.map