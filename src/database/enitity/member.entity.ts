import { Expose } from 'class-transformer';

import { Bank } from './bank.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

@Entity()
export class Member {
  constructor(partial?: Partial<Member | Member[]>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @Expose()
  @Index()
  id: number;

  @Column()
  @Expose()
  phone: string;

  @Column()
  @Expose()
  firstName: string;

  @Column()
  @Expose()
  lastName: string;

  @Column()
  @Expose()
  bankAccountNumber: string;

  @Column()
  @Expose()
  lineId: string;

  @Column({ nullable: true })
  @Expose()
  recommender: string;

  @Column()
  @Expose()
  password: string;

  @Column({ nullable: true })
  @Expose()
  bonusId: number;

  @Column({ nullable: true })
  @Expose()
  parentId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @ManyToOne(() => Bank)
  @JoinColumn()
  bank: Bank;
}

// "firstName":"demoFirstName",
// "lastName":"demoLastName",
// "bankAccount":{"id":2,"code":"KBANK","name":"ธนาคารกสิกรไทย"},
// "bankAccountNumber":"1100300361541",
// "lineId":"demoLineId",
// "recommender":"demo Name",
// "password":"demoPassword",
