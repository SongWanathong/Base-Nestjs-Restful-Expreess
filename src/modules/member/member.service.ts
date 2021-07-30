import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from 'src/database/enitity/member.entity';
import { Like, MoreThan, Repository, SelectQueryBuilder } from 'typeOrm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import * as moment from 'moment';
import { Length } from 'class-validator';
import { Bank } from 'src/database/enitity/bank.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberModel: Repository<Member>,
    @InjectRepository(Bank)
    private readonly bankModel: Repository<Bank>,
  ) {}

  private getEventsBaseQuery() {
    return this.memberModel
      .createQueryBuilder('member')
      .orderBy('member.id', 'DESC');
  }
  async create(input: CreateMemberDto): Promise<Member> {
    try {
      const targetMember = await this.find({ phone: input.phone });

      if (targetMember)
        throw new BadRequestException('Phone Has Been Already Exist');
      const bankAccRef = await this.generateBankAccRef(
        input.bank,
        input.bankAccountNumber,
        input.phone,
      );
      return await this.memberModel.save({ ...input, bankAccRef });
    } catch (error) {
      throw error;
    }
  }

  async findAll(query = undefined): Promise<Member[]> {
    try {
      return await this.memberModel
        .createQueryBuilder('member')
        .leftJoinAndSelect('member.bank', 'bank')
        .where(query)
        // .setParameter('date', date.toISOString())
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Member | undefined> {
    try {
      const targetUser = await this.memberModel
        .createQueryBuilder('member')
        .where({ id: id })
        .leftJoinAndSelect('member.bank', 'bank')
        .getOne();

      if (!targetUser) throw new NotFoundException('Member Not found ');

      return targetUser;
    } catch (error) {
      throw error;
    }
  }

  async find(query: any): Promise<Member | undefined> {
    try {
      return await this.memberModel
        .createQueryBuilder('member')
        .where(query)
        .leftJoinAndSelect('member.bank', 'bank')
        .getOne();
    } catch (error) {
      throw error;
    }
  }
  async findAndPagination(
    input,
    paginateOptions: IPaginationOptions,
    options,
  ): Promise<Pagination<Member>> {
    try {
      const queryBuilder = this.memberModel
        .createQueryBuilder('member')
        .where(input)

        // .andWhere(
        //   input.bankAccRef ? 'member.bankAccRef ILIKE :bankAccRef' : null,
        //   {
        //     bankAccRef: `%${input.bankAccRef}%`,
        //   },
        // )
        // .andWhere(input.lineId ? 'member.lineId ILIKE :lineId' : null, {
        //   lineId: `%${input.lineId}%`,
        // })
        // .andWhere(input.parentId ? 'member.parentId ILIKE :parentId' : null, {
        //   parentId: `%${input.parentId}%`,
        // })
        // .andWhere(
        //   input.recommender ? 'member.recommender ILIKE :recommender' : null,
        //   {
        //     recommender: `%${input.recommender}%`,
        //   },
        // )
        .leftJoinAndSelect('member.bank', 'bank')
        .orderBy('member.created_at', options.orderBy);
      const resultPaginate = await paginate<Member>(
        queryBuilder,
        paginateOptions,
      );

      return resultPaginate;
    } catch (error) {
      throw error;
    }
  }
  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<any> {
    try {
      const targetMember = await this.findOne(id);
      if (!targetMember) throw new NotFoundException('member not found');

      return await this.memberModel.update(id, updateMemberDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const targetMember = await this.findOne(id);
      if (!targetMember)
        throw new HttpException('mumber is not found', HttpStatus.BAD_REQUEST);

      await this.memberModel.delete(id);

      return 'member has been delete';
    } catch (error) {
      throw error;
    }
  }

  private async generateBankAccRef(
    bankName: any,
    bankAcc: string,
    phone: string,
  ) {
    const targetBank = await this.bankModel.findOne({ id: bankName });
    if (targetBank.code == 'KBANK') {
      //    0911319896   X131989X
      bankAcc = bankAcc.substring(3, 9);
      const bankAccRef = 'X' + bankAcc + 'X';
      return bankAccRef;
    } else if (targetBank.code == 'TRUEWALLET') {
      return phone.toString();
    } else if (targetBank.code == 'GSB') {
      bankAcc = bankAcc.substring(6);
      const bankAccRef = 'X' + bankAcc;
      return bankAccRef;
    } else if (targetBank.code == 'BAAC') {
      bankAcc = bankAcc.substring(6);
      const bankAccRef = 'X' + bankAcc;
      return bankAccRef;
    } else {
      //     4300867619   X867619
      bankAcc = bankAcc.substring(4);
      const bankAccRef = 'X' + bankAcc;
      return bankAccRef;
    }
  }

  async baseFindAll(query = null, startDate = null, endDate = null) {
    try {
      endDate = new Date();
      if (startDate && endDate) {
        return await this.getEventsBaseQuery()
          .where('DATE(t.created_at) >= DATE(:startDate)', { startDate })
          .andWhere('DATE(member.created_at) >= DATE(:endDate)', { endDate })
          .getMany();
      } else {
        return await this.getEventsBaseQuery()
          .where(query)

          .getMany();
      }
    } catch (error) {
      throw error;
    }
  }

  // public async dataValidate(
  //   input: CreateMemberDto,
  //   hash: string,
  // ): Promise<any | undefined> {
  //   if ((await this.countByphone(input.phone, hash)) > 0) {
  //     return {
  //       status: false,
  //       data: new BadRequestException('เบอร์โทรศัพท์ซ้ำกับในระบบ'),
  //     };
  //   }
  //   if (await this.companyBankCheck(input.bankAcc, hash)) {
  //     return {
  //       status: false,
  //       data: new BadRequestException('เลขบัญชีซ้ำกับในระบบ'),
  //     };
  //   }
  //   if (
  //     (await this.countByNameAndLastname(input.name, input.lastname, hash)) > 0
  //   ) {
  //     return {
  //       status: false,
  //       data: new BadRequestException('ชื่อและนามสกุลซ้ำกับในระบบ'),
  //     };
  //   }

  //   this.logger.debug(`getBankById SQL =${query.getSql()}`);
  //   return await query.getOne();
  // }
}
