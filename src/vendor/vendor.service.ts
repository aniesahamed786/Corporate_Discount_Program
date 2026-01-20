import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';


@Injectable()
export class VendorService {

    constructor(  @InjectDataSource()
      private datasource: DataSource){
    
    }
     async createVendor(vendorData: CreateVendorDto): Promise<any> {
    const queryText = `
      INSERT INTO "public"."Vendor" (admin_id, name, email, address, business_name, mobile_phone, status)
      VALUES (
          (SELECT "id" FROM "public"."Admin" WHERE username = $1), -- Parameter for adminUsername
          $2, -- Parameter for name
          $3, -- Parameter for email
          $4, -- Parameter for address
          $5, -- Parameter for business_name
          $6, -- Parameter for mobile_phone
          $7  -- Parameter for status
      )
      RETURNING id,'; -- Optional: return the ID of the newly inserted vendor
    `;

    const queryParams = [
      vendorData.admin_id,
      vendorData.name,
      vendorData.email,
      vendorData.address,
      vendorData.business_name,
      vendorData.mobile_phone,
      vendorData.status,
    ];

    try {
      const result = await this.datasource.query(queryText, queryParams);
      // if (result.rows.length > 0) {
      //   return result.rows[0]; 
      // }
      return result;
    } catch (error) {
      
      console.error('Error creating vendor:', error.message);
      throw new Error('Failed to create vendor: ' + error.message);
    }
  }
   async GetVendorDetails(vendor_id: number): Promise<any> {
    try {

      const queryText = `SELECT * FROM "public"."Vendor" WHERE id = $1`;

      // Pass the vendor_id as a parameter
      const result = await this.datasource.query(queryText, [vendor_id]);

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

  findAll() {
    return `This action returns all vendor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vendor`;
  }

  update(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
  }
   async createNewVendor(vendorDetails:CreateVendorDto){
    try{
         const result =  await this.datasource.query('SELECT * FROM "public"."Admin"');
    return result
    }
    catch(error){
      return error
    }
 
  }


}
