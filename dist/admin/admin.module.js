"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const request_entity_1 = require("../vendor/entities/request.entity");
const vendor_entity_1 = require("../vendor/entities/vendor.entity");
const vendor_created_offer_entity_1 = require("../vendor/entities/vendor-created-offer.entity");
const vendor_credentials_entity_1 = require("../vendor/entities/vendor-credentials.entity");
const vendor_profile_entity_1 = require("../vendor/entities/vendor-profile.entity");
const request_history_entity_1 = require("../vendor/entities/request-history.entity");
const category_entity_1 = require("../vendor/entities/category.entity");
const sub_category_entity_1 = require("../vendor/entities/sub-category.entity");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.Admin, request_entity_1.Request, vendor_entity_1.Vendor, vendor_credentials_entity_1.VendorCredentials, vendor_created_offer_entity_1.VendorCreatedOffer, vendor_profile_entity_1.VendorProfile, request_history_entity_1.RequestHistory, category_entity_1.Category, sub_category_entity_1.SubCategory])
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map