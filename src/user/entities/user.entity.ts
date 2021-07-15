import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  constructor(partial?: Partial<User | User[]>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column()
  @Expose()
  firstName: string;

  @Column()
  @Expose()
  lastName: string;

  @Column()
  @Expose()
  bankAccount: string;

  @Column()
  @Expose()
  bankAccountNumber: string;

  @Column()
  @Expose()
  lineId: string;

  @Column()
  @Expose()
  recommender: string;

  @Column()
  @Expose()
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}

// "firstName":"demoFirstName",
// "lastName":"demoLastName",
// "bankAccount":{"id":2,"code":"KBANK","name":"ธนาคารกสิกรไทย"},
// "bankAccountNumber":"1100300361541",
// "lineId":"demoLineId",
// "recommender":"demo Name",
// "password":"demoPassword",
