import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { SwaggerModule } from '@nestjs/swagger';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/database/enitity/member.entity';
import { Bank } from 'src/database/enitity/bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Bank]), SwaggerModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
