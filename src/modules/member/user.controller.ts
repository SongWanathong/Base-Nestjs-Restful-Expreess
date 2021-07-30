import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('member')
@ApiTags('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiBody({ type: '' })
  @ApiResponse({ status: 200, description: 'ได้ object ที่สร้างสำเร็จกลับมา' })
  @ApiResponse({ status: 400, description: 'ข้อมูลที่ใส่มาไม่ถูกต้อง' })
  @ApiResponse({ status: 500, description: 'เลขบัญชีซ้ำในระบบ' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createMemberDto: CreateMemberDto): any {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  findAll() {
    try {
      return this.memberService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.memberService.remove(+id);
  }
}
