import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  Max,
  IsOptional,
  IsMobilePhone,
} from 'class-validator';

export class CreateMemberDto {
  @IsMobilePhone()
  @IsNotEmpty()
  @ApiProperty()
  @Length(1, 10)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(1, 20)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(1, 20)
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Max(18)
  bank: any;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(8, 15)
  bankAccountNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(1, 30)
  lineId: string;

  @IsString()
  @ApiProperty()
  @Length(1, 30)
  recommender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(8, 13)
  password: string;

  @IsOptional()
  @ApiProperty()
  bonusId: number;
}
