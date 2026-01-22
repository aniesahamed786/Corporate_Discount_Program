import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { CreateRequestDto } from './dto/createRequest.dto';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  createNewVendor(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.createVendor(createVendorDto);
  }

   @Post('request')
  createVendorRequest(@Body() createRequest: CreateRequestDto) {
    return this.vendorService.createVendorRequest(createRequest);
  }
  @Get()
  findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
  getVendorDetailsById(@Param('id') id: number) {
    return this.vendorService.GetVendorDetails(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.updateVendorDetailsById(id, updateVendorDto);
  }

  @Get('offers/approved')
  getApprovedOffers() {
  return this.vendorService.getApprovedOffers();
}
@Get('offers/approved/:id')
getVendorCreatedOffers(@Param('id') id: number) {
  return this.vendorService.getApprovedOffersByVendorId(id);
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(+id);
  }


}
