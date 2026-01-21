import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorModule } from './vendor/vendor.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


@Module({
  imports: [
    TypeOrmModule.forRoot({
       type:'postgres',
       host:'34.171.107.243',
       port:5432,
       username:'postgres',
       password:'Anies@2026',
       database:'test',
       ssl:{
        rejectUnauthorized:false
       },
       autoLoadEntities:true,
       synchronize:false,
       namingStrategy: new SnakeNamingStrategy(), 
    }),
    VendorModule,
    AdminModule,
    AuthenticationModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
