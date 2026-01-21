import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Request } from '../vendor/entities/request.entity'
import { RequestStatusEnum, VendorRegistrationStatus } from 'src/Common/enum';
import { Vendor } from 'src/vendor/entities/vendor.entity';
@Injectable()
export class AdminService {
   
  constructor(  
      @InjectDataSource()
      private datasource: DataSource,
      @InjectRepository(Request)
      private requestRepo: Repository<Request>,
       @InjectRepository(Vendor)
      private vendorRepo: Repository<Vendor>,
    ){
     
    }

     async getAllRequests() {
    return await this.requestRepo.find({
      relations: ['vendor'],
      order: { created_at: 'DESC' },
    });
  }
  async getRequestsByVendor(vendorId: number) {

    return await this.requestRepo.find({
      where: {
        vendor: { id: vendorId },
      },
      relations: ['vendor'],
      order: { created_at: 'DESC' },
    });
  }

  async getRequestById(id: number) {

    const request = await this.requestRepo.findOne({
      where: { request_id: id },
      relations: ['vendor'],
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    return request;
  }

  async approveRequest(request_id:number,AdminId:any){
    const request = await this.requestRepo.findOne({ where: { request_id : request_id}});
    if(!request){
      throw new NotFoundException('Request id not found' + `${request_id}`);
    }
    return await this.datasource.transaction( async (manager) => {
       const payload = request.payload;
       switch (request.request_type){
        case 'vendor_registration': {
          const vendor = this.vendorRepo.create({
              name: payload.name,
              email: payload.email,
              business_name: payload.business_name,
              mobile_phone: payload.mobile_phone,
              address: payload.address,
              status:VendorRegistrationStatus.APPROVED,
              admin: { id: AdminId }
          })
          await manager.save(vendor) ;
          await manager.update(Request,request_id,{vendor: { id: vendor.id,status:vendor.status },});
          break;
        }
       }
    })
  }
   
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }



  findAll() {
    return `This action returns all admin`;
  }

  // getVendorList(){
  //   try{
  //       const response = 
  //   }
  //   catch(error){

  //   }
  // }

   async GetVendorList(): Promise<any> {
      try {
  
        const queryText = `SELECT * FROM "public"."Vendor";`;
  
        // Pass the vendor_id as a parameter
        const result = await this.datasource.query(queryText);
  
        // if (result.rows.length > 0) {
       
        //   return result.rows[0];
        // }
        // If no vendor found with that ID
        return result;
      } catch (error) {
        console.error('Error fetching vendor details:', error.message);
    
        throw new Error('Failed to fetch vendor details: ' + error.message);
      }
    }

    async getVendorById(id:number): Promise<any> {
         try {
      const queryText = `SELECT * FROM "public"."Vendor" WHERE id = $1`;
      // Pass the vendor_id as a parameter
      const result = await this.datasource.query(queryText, [id]);
        // if (result.rows.length > 0) {
        //   return result.rows[0];
        // }
        // If no vendor found with that ID
        return result;
      } catch (error) {
        console.error('Error fetching vendor details:', error.message);
    
        throw new Error('Failed to fetch vendor details: ' + error.message);
      }
    }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
