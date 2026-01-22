import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { CreateRequestDto } from './dto/createRequest.dto';
export declare class VendorController {
    private readonly vendorService;
    constructor(vendorService: VendorService);
    createNewVendor(createVendorDto: CreateVendorDto): Promise<any>;
    createVendorRequest(createRequest: CreateRequestDto): Promise<import("./entities/request.entity").Request>;
    findAll(): string;
    getVendorDetailsById(id: number): Promise<any>;
    update(id: number, updateVendorDto: UpdateVendorDto): Promise<any>;
    getApprovedOffers(): Promise<{
        success: boolean;
        count: number;
        data: import("./entities/vendor-created-offer.entity").VendorCreatedOffer[];
    }>;
    remove(id: string): string;
}
