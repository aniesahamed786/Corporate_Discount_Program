import { Injectable } from '@nestjs/common';
import {InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(  @InjectDataSource()
    private readonly datasource: DataSource){
  
  }
  getHello(): string {
    return 'Hello World!';
  }
  async getAdmin(){
    try{
         const result =  await this.datasource.query('SELECT * FROM "public"."Admin"');
    return result
    }
    catch(error){
      return error
    }
 
  }
}
