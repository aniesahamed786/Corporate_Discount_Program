import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
export declare class VendorController {
    private readonly vendorService;
    constructor(vendorService: VendorService);
    createNewVendor(createVendorDto: CreateVendorDto): Promise<any>;
    findAll(): string;
    getVendorDetailsById(id: number): Promise<any>;
    update(id: string, updateVendorDto: UpdateVendorDto): string;
    remove(id: string): string;
}
