import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableOrderProduct1795435097016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.order_product ALTER COLUMN price TYPE double precision USING price::double precision;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.order_product ALTER COLUMN price TYPE integer USING price::integer;
    `);
  }
}
