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
exports.Admin = void 0;
const typeorm_1 = require("typeorm");
const vendor_entity_1 = require("../../vendor/entities/vendor.entity");
const request_history_entity_1 = require("../../vendor/entities/request-history.entity");
let Admin = class Admin {
    id;
    name;
    username;
    password_hash;
    created_at;
    vendors;
    requestHistory;
};
exports.Admin = Admin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Admin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Admin.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Admin.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Admin.prototype, "password_hash", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Admin.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vendor_entity_1.Vendor, vendor => vendor.admin),
    __metadata("design:type", Array)
], Admin.prototype, "vendors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => request_history_entity_1.RequestHistory, history => history.admin),
    __metadata("design:type", Array)
], Admin.prototype, "requestHistory", void 0);
exports.Admin = Admin = __decorate([
    (0, typeorm_1.Entity)('Admin')
], Admin);
//# sourceMappingURL=admin.entity.js.map