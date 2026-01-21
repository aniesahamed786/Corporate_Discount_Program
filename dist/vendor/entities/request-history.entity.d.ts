import { Request } from './request.entity';
import { Admin } from '../../admin/entities/admin.entity';
import { RequestStatusEnum } from '../../Common/enum';
export declare class RequestHistory {
    history_id: number;
    request: Request;
    admin: Admin;
    action: RequestStatusEnum;
    comment: string;
    created_at: Date;
}
