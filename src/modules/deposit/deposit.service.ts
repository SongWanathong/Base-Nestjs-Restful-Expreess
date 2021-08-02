import { Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { Repository } from 'typeOrm';
import { Deposit } from 'src/database/enitity/deposit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositModel: Repository<Deposit>,
  ) {}
  private baseQuery() {
    return this.depositModel
      .createQueryBuilder('deposit')
      .orderBy('deposit.created_at', 'DESC');
  }

  create(createDepositDto: CreateDepositDto) {
    try {
      return this.depositModel.save(createDepositDto);
    } catch (error) {
      throw error;
    }
  }

  findAll(query = undefined) {
    try {
      return this.depositModel.find(query);
    } catch (error) {
      throw error;
    }
  }

  findOne(query = undefined) {
    try {
      return this.depositModel.findOne(query);
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateDepositDto: UpdateDepositDto) {
    try {
      return this.depositModel.update(id, updateDepositDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    try {
      return this.depositModel.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async alreadydeposit(query: Deposit): Promise<any> {
    try {
      console.log(query);
      const today = moment().format('YYYY-MM-DD');
      return await this.baseQuery()
        .where(query)
        .andWhere('DATE(deposit.created_at) >= DATE(:startDate)', {
          startDate: today + ' 00:00:00',
        })
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  // public static  countdepositinoneday($id)
  // {
  //    return static::where('member_id',$id)->whereDate('created_at', Carbon::today())->count();
  // }

  async countdepositinoneday(query) {
    try {
      const today = moment().format('YYYY-MM-DD');
      const targetDesposit = await this.baseQuery()
        .where(query)
        .andWhere('DATE(deposit.created_at) >= DATE(:startDate)', {
          startDate: today + ' 00:00:00',
        })
        .getMany();
      return targetDesposit.length;
    } catch (error) {
      throw error;
    }
  }

  // public static  select20record()
  // {
  //     return static::orderBy('created_at', 'desc')->take(20)->get();
  // }

  async select20record() {
    try {
      return await this.depositModel.find({
        order: {
          created_at: 'DESC',
        },
        take: 20,
      });
    } catch (error) {
      throw error;
    }
  }

  // public static  onedayalldeposit()
  // {
  //     return static::whereDate('created_at', Carbon::today())->sum('amount');
  // }

  async onedayalldeposit() {
    try {
      const today = moment().format('YYYY-MM-DD');
      const targetDesposit = await this.depositModel
        .createQueryBuilder('deposit')
        .where('DATE(deposit.created_at) >= DATE(:startDate)', {
          startDate: today + ' 00:00:00',
        })
        .select('SUM(deposit.amount)', 'sum')
        .getRawOne();
      return targetDesposit;
    } catch (error) {
      throw error;
    }
  }

  // public static  oneMonthDeposit()
  // {
  //     $start = new Carbon('first day of this month');
  //     $end = new Carbon('last day of this month');

  //     return static::whereBetween('created_at', [$start, $end])->sum('amount');
  // }
  async oneMonthDeposit() {
    try {
      const startOfMonth = moment()
        .startOf('month')
        .format('YYYY-MM-DD hh:mm');
      const endOfMonth = moment()
        .endOf('month')
        .format('YYYY-MM-DD hh:mm');
      const targetDesposit = await this.baseQuery()

        .where('DATE(deposit.created_at) >= DATE(:startOfMonth)', {
          startOfMonth,
        })
        .andWhere('DATE(deposit.created_at) <= DATE(:endOfMonth)', {
          endOfMonth,
        })
        .getMany();
      return targetDesposit;
    } catch (error) {
      throw error;
    }
  }

  // public static  lastestTopupTime($id)
  // {

  //     return static::where('member_id',$id)->orderby('updated_at','desc')->pluck('updated_at')->first();
  // }

  async lastestTopupTime(memberId: string): Promise<Deposit> {
    try {
      return await this.depositModel
        .createQueryBuilder('deposit')
        .where({ member_id: memberId })
        .orderBy('updated_at', 'DESC')
        .getOne();
    } catch (error) {
      throw error;
    }
  }

  // public static  justTopup()
  // {

  //     return static::orderby('created_at','desc')->pluck('created_at')->first();
  // }
  async justTopup() {
    try {
      return await this.baseQuery().getOne();
    } catch (error) {
      throw error;
    }
  }

  // public static  getStarttime($ref)
  // {

  //     return static::where('dpref',$ref)->pluck('created_at')->first();
  // }
  async getStarttime(dpref: string) {
    try {
      return await this.depositModel.findOne({
        where: {
          dpref,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
