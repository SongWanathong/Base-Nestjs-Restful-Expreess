import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from 'src/database/enitity/member.entity';
import { Repository } from 'typeOrm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberModel: Repository<Member>,
  ) {}

  async create(input: CreateMemberDto): Promise<Member> {
    try {
      const targetMember = await this.find({ phone: input.phone });

      if (targetMember)
        throw new HttpException(
          'Phone Has Been Already Exist',
          HttpStatus.BAD_REQUEST,
        );

      return await this.memberModel.save(input);
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

      if (!targetUser)
        throw new HttpException('Member Not found ', HttpStatus.BAD_REQUEST);

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

  // async findPaginate(
  //   query: any,
  //   options: IPaginationOptions,
  // ): Promise<Pagination<Member>> {
  //   try {
  //     return await this.memberModel
  //       .createQueryBuilder('member')
  //       .where(query)
  //       .leftJoinAndSelect('member.bank', 'bank')
  //       .getOne();
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<any> {
    try {
      await this.memberModel.update(id, updateMemberDto);
      return this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const targetMember = await this.findOne(id);
      if (!targetMember)
        throw new HttpException(
          ' id not already exists',
          HttpStatus.BAD_REQUEST,
        );

      return await this.memberModel.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
