import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
@Injectable()
export class AdminService {
   
  constructor(  @InjectDataSource()
      private datasource: DataSource){
    
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
