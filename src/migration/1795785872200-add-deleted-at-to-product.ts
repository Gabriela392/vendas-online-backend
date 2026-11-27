import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDeletedAtToProduct1795785872200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product"
      ADD "deleted_at" timestamp without time zone;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product"
      DROP COLUMN "deleted_at";
    `);
  }
}
