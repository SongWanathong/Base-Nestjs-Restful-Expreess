import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDepositDto {
  @IsNotEmpty()
  @ApiProperty()
  companyBank: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  bonusamount: number;

  @ApiProperty()
  @IsNotEmpty()
  bfcredit: string;

  @ApiProperty()
  @IsNotEmpty()
  agcredit: string;

  @ApiProperty()
  @IsNotEmpty()
  smsdatetime: string;

  @ApiProperty()
  @IsNotEmpty()
  topupby: string;

  @ApiProperty()
  @IsNotEmpty()
  dpref: string;

  @ApiProperty()
  @IsNotEmpty()
  remark: string;

  @ApiProperty()
  @IsNotEmpty()
  member_id: string;

  @ApiProperty()
  @IsNotEmpty()
  dp_count: string;
}
