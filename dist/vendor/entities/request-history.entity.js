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
exports.RequestHistory = void 0;
const typeorm_1 = require("typeorm");
const request_entity_1 = require("./request.entity");
const admin_entity_1 = require("../../admin/entities/admin.entity");
const enum_1 = require("../../Common/enum");
let RequestHistory = class RequestHistory {
    history_id;
    request;
    admin;
    action;
    comment;
    created_at;
};
exports.RequestHistory = RequestHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RequestHistory.prototype, "history_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.Request, { onDelete: 'CASCADE' }),
    __metadata("design:type", request_entity_1.Request)
], RequestHistory.prototype, "request", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, { onDelete: 'SET NULL' }),
    __metadata("design:type", admin_entity_1.Admin)
], RequestHistory.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enum_1.RequestStatusEnum,
    }),
    __metadata("design:type", String)
], RequestHistory.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], RequestHistory.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RequestHistory.prototype, "created_at", void 0);
exports.RequestHistory = RequestHistory = __decorate([
    (0, typeorm_1.Entity)('REQUEST_HISTORY')
], RequestHistory);
//# sourceMappingURL=request-history.entity.js.map