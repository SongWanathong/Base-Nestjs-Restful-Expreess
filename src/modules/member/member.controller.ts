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
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import scopeSearch from 'src/helpers/searchQuery';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Member } from 'src/database/enitity/member.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
@Controller('member')
@ApiTags('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({ status: 200, description: 'ได้ object ที่สร้างสำเร็จกลับมา' })
  @ApiResponse({ status: 400, description: 'ข้อมูลที่ใส่มาไม่ถูกต้อง' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createMemberDto: CreateMemberDto): any {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.memberService.findAll();
  }

  @Get('/find')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAndPagination(@Query() data): Promise<any> {
    const { query, option } = scopeSearch(data);
    return this.memberService.findAndPagination(
      query,
      {
        page: option.page,
        limit: option.limit,
      },
      option,
    );
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiParam({
    name: 'id',
    type: 'id',
    description: 'id ของ member',
    example: '1',
  })
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'member has been deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'id not already exists',
  })
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
