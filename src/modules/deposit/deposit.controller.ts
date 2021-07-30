import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Controller('/deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @MessagePattern('createDeposit')
  @Post()
  create(
    @Payload() createDepositDto: CreateDepositDto,
    @Body() body: CreateDepositDto,
  ) {
    return this.depositService.create(body);
  }

  @MessagePattern('findAllDeposit')
  @Get()
  findAll() {
    return this.depositService.findAll();
  }

  @MessagePattern('findOneDeposit')
  @Get('/findOne/:id')
  findOne(@Payload() id: number) {
    return this.depositService.findOne(id);
  }

  @MessagePattern('updateDeposit')
  @Patch()
  update(@Payload() updateDepositDto: UpdateDepositDto) {
    return this.depositService.update(updateDepositDto.id, updateDepositDto);
  }

  @MessagePattern('removeDeposit')
  @Delete()
  remove(@Payload() id: string) {
    return this.depositService.remove(id);
  }

  @Get('/alreadydeposit/:id')
  alreadydeposit(@Param('id') id) {
    return this.depositService.alreadydeposit(id);
  }

  @Get('/countdepositinoneday')
  countdepositinoneday(@Query() query) {
    return this.depositService.countdepositinoneday(query);
  }

  @Get('/select20record')
  select20record() {
    return this.depositService.select20record();
  }

  @Get('/onedayalldeposit')
  onedayalldeposit() {
    return this.depositService.onedayalldeposit();
  }

  @Get('/oneMonthDeposit')
  oneMonthDeposit() {
    return this.depositService.oneMonthDeposit();
  }

  @Get('/lastestTopupTime')
  lastestTopupTime() {
    return this.depositService.lastestTopupTime();
  }

  @Get('/justTopup')
  justTopup() {
    return this.depositService.justTopup();
  }

  @Get('/getStarttime/:dpref')
  getStarttime(@Param('dpref') dpref) {
    return this.depositService.getStarttime(dpref);
  }
}
