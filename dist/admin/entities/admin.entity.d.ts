import { Vendor } from '../../vendor/entities/vendor.entity';
import { RequestHistory } from '../../vendor/entities/request-history.entity';
export declare class Admin {
    id: number;
    name: string;
    username: string;
    password_hash: string;
    created_at: Date;
    vendors: Vendor[];
    requestHistory: RequestHistory[];
}
