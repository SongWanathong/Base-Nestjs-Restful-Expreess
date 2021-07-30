import { Expose, Exclude } from 'class-transformer';

import { Bank } from './bank.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Deposit {
  constructor(partial?: Partial<Deposit | Deposit[]>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @Expose()
  @Index()
  id: string;

  @Column()
  @Expose()
  companyBank: string;

  @Column()
  @Expose()
  amount: number;

  @Column()
  @Expose()
  bonusamount: number;

  @Column()
  @Expose()
  bfcredit: string;

  @Column()
  @Expose()
  agcredit: string;

  @Column()
  @Expose()
  smsdatetime: string;

  @Column()
  @Expose()
  topupby: string;

  @Column()
  @Expose()
  dpref: string;

  @Column()
  @Expose()
  remark: string;

  @Column()
  @Expose()
  member_id: string;

  @Column()
  @Expose()
  dp_count: string;

  @Column({ nullable: true })
  @Expose()
  @Index()
  hash: string;

  @Column({ nullable: true })
  @Expose()
  company: string;

  @Column({ nullable: true })
  @Expose()
  agent_username: string;

  @Column({ nullable: true })
  @Expose()
  deposit_id_rico: number;

  @Column({ nullable: true })
  @Expose()
  username: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
