import { IsEnum, IsNumber, IsObject, IsOptional } from 'class-validator'
import { RequestTypeEnum } from '../../Common/enum'

export class CreateRequestDto {
     @IsEnum(RequestTypeEnum)
     request_type: RequestTypeEnum;
     @IsOptional()
     @IsNumber()
     target_id?:number;

     @IsObject()
     payload:Record<string,any>;
}