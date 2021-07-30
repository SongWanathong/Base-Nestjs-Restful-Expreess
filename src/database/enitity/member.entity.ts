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

  @Column({ nullable: true })
  @Expose()
  bankAccRef: string;

  @Column()
  @Expose()
  lineId: string;

  @Column({ nullable: true })
  @Expose()
  recommender: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Expose()
  bonusId: number;

  @Column({ nullable: true })
  @Expose()
  parentId: number;

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
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP (6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP (6)',
    onUpdate: 'CURRENT_TIMESTAMP (6)',
  })
  public updated_at: Date;

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
