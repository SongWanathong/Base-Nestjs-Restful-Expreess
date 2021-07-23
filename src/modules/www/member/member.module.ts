import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { SwaggerModule } from '@nestjs/swagger';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/database/enitity/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), SwaggerModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
