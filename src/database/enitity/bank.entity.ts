import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column()
  name: string;

  @OneToMany(
    () => Member,
    member => member.bank,
  )
  member: Member[];
}
