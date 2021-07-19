import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import ormConfig from './config/orm.config';
import { ConfigModule } from '@nestjs/config'; //npm install --save @nestjs/config
import { TypeOrmModule } from '@nestjs/typeorm'; //npm install --save @nestjs/typeorm typeorm mysql
import ormConfigProd from './config/orm.config.prod';
import { SwaggerModule } from '@nestjs/swagger';
import { MemberModule } from './modules/www/member/member.module';
import { AppController } from './app.controller';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
