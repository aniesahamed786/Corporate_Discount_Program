import { Vendor } from './vendor.entity';
import { RequestStatusEnum, RequestTypeEnum } from '../../Common/enum';
export declare class Request {
    request_id: number;
    vendor?: Vendor;
    request_type: RequestTypeEnum;
    target_table: string;
    target_id: number;
    payload: any;
    status: RequestStatusEnum;
    admin_comment: string;
    created_at: Date;
    updated_at: Date;
}
