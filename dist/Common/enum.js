"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTypesEnum = exports.RequestTypeEnum = exports.RequestStatusEnum = exports.OfferClaimedStatus = exports.VendorOfferCreationStatus = exports.VendorRegistrationStatus = void 0;
var VendorRegistrationStatus;
(function (VendorRegistrationStatus) {
    VendorRegistrationStatus["PENDING"] = "pending";
    VendorRegistrationStatus["APPROVED"] = "approved";
    VendorRegistrationStatus["REJECTED"] = "rejected";
})(VendorRegistrationStatus || (exports.VendorRegistrationStatus = VendorRegistrationStatus = {}));
var VendorOfferCreationStatus;
(function (VendorOfferCreationStatus) {
    VendorOfferCreationStatus["PENDING"] = "pending";
    VendorOfferCreationStatus["APPROVED"] = "approved";
    VendorOfferCreationStatus["REJECTED"] = "rejected";
})(VendorOfferCreationStatus || (exports.VendorOfferCreationStatus = VendorOfferCreationStatus = {}));
var OfferClaimedStatus;
(function (OfferClaimedStatus) {
    OfferClaimedStatus["CLAIM"] = "claim";
    OfferClaimedStatus["UNCLAIM"] = "unclaim";
})(OfferClaimedStatus || (exports.OfferClaimedStatus = OfferClaimedStatus = {}));
var RequestStatusEnum;
(function (RequestStatusEnum) {
    RequestStatusEnum["PENDING"] = "pending";
    RequestStatusEnum["APPROVED"] = "approved";
    RequestStatusEnum["REJECTED"] = "rejected";
})(RequestStatusEnum || (exports.RequestStatusEnum = RequestStatusEnum = {}));
var RequestTypeEnum;
(function (RequestTypeEnum) {
    RequestTypeEnum["VENDOR_REGESTRATION"] = "vendor_registration";
    RequestTypeEnum["VENDOR_UPDATE"] = "vendor_update";
    RequestTypeEnum["PROFILE_CREATE"] = "profile_create";
    RequestTypeEnum["PROFILE_UPDATE"] = "profile_update";
    RequestTypeEnum["OFFER_CREATE"] = "offer_create";
    RequestTypeEnum["OFFER_UPDATE"] = "offer_update";
    RequestTypeEnum["OFFER_DELETE"] = "offer_delete";
})(RequestTypeEnum || (exports.RequestTypeEnum = RequestTypeEnum = {}));
var RequestTypesEnum;
(function (RequestTypesEnum) {
    RequestTypesEnum["CREATE"] = "create";
    RequestTypesEnum["UPDATE"] = "update";
    RequestTypesEnum["DELETE"] = "delete";
})(RequestTypesEnum || (exports.RequestTypesEnum = RequestTypesEnum = {}));
//# sourceMappingURL=enum.js.map