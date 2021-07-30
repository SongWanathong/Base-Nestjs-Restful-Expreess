import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import ormConfig from './config/orm.config';
import { ConfigModule } from '@nestjs/config'; //npm install --save @nestjs/config
import { TypeOrmModule } from '@nestjs/typeorm'; //npm install --save @nestjs/typeorm typeorm mysql
import ormConfigProd from './config/orm.config.prod';
import { SwaggerModule } from '@nestjs/swagger';
import { MemberModule } from './modules/member/member.module';
import { AppController } from './app.controller';
import { DepositModule } from './modules/deposit/deposit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    SwaggerModule,
    MemberModule,
    DepositModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
