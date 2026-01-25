import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorCredentials } from './entities/vendor-credentials.entity';
import { VendorProfile } from './entities/vendor-profile.entity';
import { StoreLocation } from './entities/store-location.entity';
import { VendorCreatedOffer } from './entities/vendor-created-offer.entity';
import { Vendor } from './entities/vendor.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { RequestHistory } from './entities/request-history.entity';
import { Request } from './entities/request.entity';
import { VendorOfferCategory } from './entities/vendor-offer-category.entity';
import { VendorOfferSubCategory } from './entities/vendor-offer-sub-category.entity';


@Module({
  imports: [
      TypeOrmModule.forFeature([Vendor,VendorCredentials,VendorCreatedOffer,VendorProfile,StoreLocation,SubCategory,Category,RequestHistory,Request,VendorOfferCategory,VendorOfferSubCategory])
    ],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
