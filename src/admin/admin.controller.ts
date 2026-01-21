import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { RejectApproveDto } from './dto/rejectApprove.dto'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

   @Post('/ReviewRequest')
  ReviewRequest(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.GetVendorList()
  }
  @Get('requestList')
  getAllRequests() {
    return this.adminService.getAllRequests()
  }
   @Patch(':id/approve')
  approve(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.approveRequest(id, updateAdminDto.adminId);

  }
   @Patch(':id/reject')
  reject(@Param('id') id: number, @Body() RejectApproveDto: RejectApproveDto ) {
    return this.adminService.rejectRequest(id,  RejectApproveDto.adminId,RejectApproveDto.comment);

  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.getVendorById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
