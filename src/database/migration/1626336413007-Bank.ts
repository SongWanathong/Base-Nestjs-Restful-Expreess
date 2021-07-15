/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { BankSeed } from '../seed/bank.seed';

export class Bank1626336413007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('bank').save(BankSeed);
    // const userRoleSeed: any = UserRoleSeed;
    // userRoleSeed.permissions = permissions;
    // await getRepository('roles').save(userRoleSeed);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
