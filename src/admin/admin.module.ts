import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity'
import { Request } from 'src/vendor/entities/request.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin,Request,Vendor])
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
