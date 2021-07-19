import { PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';
import { IsString, Length, IsNumber, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  @IsOptional()
  @IsString()
  @ApiProperty()
  @Length(1, 20)
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Length(1, 20)
  lastName: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @Max(18)
  bank: any;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Length(8, 15)
  bankAccountNumber: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Length(1, 30)
  lineId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Length(1, 30)
  recommender: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @Length(8, 13)
  password: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  bonusId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  parentId: number;
}
