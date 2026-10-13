import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1791899253601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public."user" (
                id SERIAL PRIMARY KEY,
                name character varying NOT NULL,
                email character varying NOT NULL,
                cpf character varying NOT NULL,
                type_user integer NOT NULL,
                phone character varying NOT NULL,
                password character varying NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE public."user"');
    }
}
