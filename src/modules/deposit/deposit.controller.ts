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
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiExtension,
  ApiHideProperty,
  ApiParam,
  ApiPayloadTooLargeResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

import { Deposit } from 'src/database/enitity/deposit.entity';

@Controller('/deposit')
@ApiTags('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  // @MessagePattern('createDeposit')
  @Post()
  create(
    // @Payload() createDepositDto: CreateDepositDto,
    @Body() body: CreateDepositDto,
  ) {
    return this.depositService.create(body);
  }

  // @MessagePattern('findAllDeposit')
  @Get()
  findAll() {
    return this.depositService.findAll();
  }

  // @MessagePattern('findOneDeposit')
  @Get('/findOne/:id')
  findOne(
    // @Payload() id: number
    @Query() id: number,
  ) {
    return this.depositService.findOne(id);
  }

  // @MessagePattern('updateDeposit')
  @Patch()
  update(
    // @Payload() updateDepositDto: UpdateDepositDto
    @Query() updateDepositDto: UpdateDepositDto,
  ) {
    return this.depositService.update(updateDepositDto.id, updateDepositDto);
  }

  // @MessagePattern('removeDeposit')
  @ApiQuery({
    name: 'id',
  })
  @Delete()
  remove(@Query('id') id) {
    return this.depositService.remove(id);
  }

  @Get('/alreadydeposit')
  @ApiBody({ type: Deposit, required: false })
  alreadydeposit(@Body('query') query: Deposit) {
    return this.depositService.alreadydeposit(query);
  }

  @Get('/countdepositinoneday')
  @ApiBody({ type: Deposit, required: false })
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
  // @ApiQuery({ name: 'member ', type: 'id' })
  lastestTopupTime(@Query('member') member: string) {
    return this.depositService.lastestTopupTime(member);
  }

  @Get('/justTopup')
  justTopup() {
    return this.depositService.justTopup();
  }

  @Get('/getStarttime/:dpref')
  @ApiParam({
    name: 'dpref',
  })
  getStarttime(@Param('dpref') dpref) {
    return this.depositService.getStarttime(dpref);
  }
}
