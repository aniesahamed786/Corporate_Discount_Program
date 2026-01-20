import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private datasource: DataSource) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health/check')
   checkDb(){
      return this.appService.getAdmin();
  }
}
