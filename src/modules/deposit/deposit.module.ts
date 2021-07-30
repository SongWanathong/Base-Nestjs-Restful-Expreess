import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from 'src/database/enitity/deposit.entity';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [TypeOrmModule.forFeature([Deposit]), SwaggerModule],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
