import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity'
import { Request } from 'src/vendor/entities/request.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { VendorCreatedOffer } from 'src/vendor/entities/vendor-created-offer.entity';
import { VendorCredentials } from 'src/vendor/entities/vendor-credentials.entity';
import { VendorProfile } from 'src/vendor/entities/vendor-profile.entity';
import { RequestHistory } from 'src/vendor/entities/request-history.entity';
import { Category } from 'src/vendor/entities/category.entity';
import { SubCategory } from 'src/vendor/entities/sub-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin,Request,Vendor,VendorCredentials,VendorCreatedOffer,VendorProfile,RequestHistory,Category,SubCategory])
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
