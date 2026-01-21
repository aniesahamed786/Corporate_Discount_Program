import { RequestTypeEnum } from '../../Common/enum';
export declare class CreateRequestDto {
    request_type: RequestTypeEnum;
    target_id?: number;
    payload: Record<string, any>;
}
