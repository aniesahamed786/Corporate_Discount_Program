import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Request } from '../vendor/entities/request.entity'
import { RequestStatusEnum, VendorOfferCreationStatus, VendorRegistrationStatus } from 'src/Common/enum';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { VendorProfile } from 'src/vendor/entities/vendor-profile.entity';
import { VendorCredentials } from 'src/vendor/entities/vendor-credentials.entity';
import { Category } from 'src/vendor/entities/category.entity';
import { SubCategory } from 'src/vendor/entities/sub-category.entity';
import { VendorCreatedOffer } from 'src/vendor/entities/vendor-created-offer.entity';
import { RequestHistory } from 'src/vendor/entities/request-history.entity';
import * as crypto from 'crypto';

@Injectable()
export class AdminService {
   
  constructor(  
      @InjectDataSource()
      private datasource: DataSource,
      @InjectRepository(Request)
      private requestRepo: Repository<Request>,
       @InjectRepository(Vendor)
      private vendorRepo: Repository<Vendor>,
      @InjectRepository(VendorProfile)
      private vendorProfileRepo: Repository<VendorProfile>,
      @InjectRepository(VendorCredentials)
      private vendorCredentialsRepo: Repository<VendorCredentials>,
      @InjectRepository(VendorCreatedOffer)
      private vendorCreatedOfferRepo: Repository<VendorCreatedOffer>,
      @InjectRepository(Category)
       private categoryRepo: Repository<Category>,
       @InjectRepository(SubCategory)
       private subCategoryRepo: Repository<SubCategory>,
    ){
     
    }

     async getAllRequests() {
    return await this.requestRepo.find({
      relations: ['vendor'],
      order: { created_at: 'DESC' },
    });
  }
  generateSecurePassword(length = 12): string {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}
 generateRandomUsername(prefix: string) {
  const random = crypto.randomBytes(3).toString('hex');
  return `${prefix.toLowerCase()}_${random}`;
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
          await manager.update(Request,request_id,{vendor: { id: vendor.id,status:VendorRegistrationStatus.APPROVED },});
          const credentialsRepo = manager.getRepository(VendorCredentials);
          const updateVendorCredentials = credentialsRepo.create({
          vendor: { id: vendor.id },
          username: this.generateRandomUsername('vendor'),
          password_hash: this.generateSecurePassword(),
});

await credentialsRepo.save(updateVendorCredentials);
          break;

          
        }
        case 'vendor_update': {
        await manager.update(Vendor, request.target_id, {
          ...payload,
          status: 'approved',
        });
        break;
      }

       case 'profile_create': {
        const profile = this.vendorProfileRepo.create({
          // vendor_profile_id: request.vendor_id,
          vendor: { id: request.vendor?.id },
          profile_image_url: payload.profile_image_url,
          dob: payload.dob,
        });
 
        await manager.save(profile);
        break;
      }
 
      case 'profile_update': {
        await manager.update(VendorProfile, request.target_id, {
          ...payload,
        });
        break;
      }
 
      case 'offer_create': {
        const offer = this.vendorCreatedOfferRepo.create({
            vendor: { id: request.vendor?.id }, 
            title: payload.title,
            short_description: payload.short_description,
            start_date: payload.start_date,
            end_date: payload.end_date,
            status: VendorOfferCreationStatus.APPROVED, 
        });
 
        await manager.save(offer);
        break;
      }

      case 'offer_update': {
        await manager.update(VendorCreatedOffer, request.target_id, {
          ...payload,
          timestamp: new Date(),
        });
        break;
      }
 
    case 'offer_delete': {
        await manager.delete(VendorCreatedOffer, request.target_id);
        break;
      }
       }
      await manager.update(Request, request_id, {
      status: RequestStatusEnum.APPROVED,
      updated_at: new Date(),
    });
 
    // ⭐ Log history
    await manager.save(RequestHistory, {
      request: { request_id: request_id },
      admin: { id: AdminId },
      action: RequestStatusEnum.APPROVED,
      comment: request.admin_comment,
    });
 
    return { message: 'Request approved successfully' };
    })
  }

  async rejectRequest(request_id:number,AdminId:any,adminComment:string){
    const request = await this.requestRepo.findOne({
    where: { request_id },
    relations: ['vendor'], 
  });
    if(!request){
      throw new NotFoundException('Request id not found' + `${request_id}`);
    }
    return await this.datasource.transaction(async (manager) => {
    // 1️⃣ Update Request table
    await manager.update(Request, request_id, {
      status: RequestStatusEnum.REJECTED,
      admin_comment: adminComment,
      updated_at: new Date(),
    });

    
    await manager.save(RequestHistory, {
      request: { request_id },
      admin: { id: AdminId },
      action: RequestStatusEnum.REJECTED,
      admin_comment: adminComment || null,
    });

    return { message: 'Request rejected successfully' };
  });
     
    
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
