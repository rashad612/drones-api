import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1707461495700 implements MigrationInterface {
    name = 'Migrations1707461495700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medication" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "weight" smallint NOT NULL, "code" character varying(100) NOT NULL, "image" character varying(2048) NOT NULL, CONSTRAINT "PK_0682f5b7379fea3c2fdb77d6545" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."drone_model_enum" AS ENUM('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')`);
        await queryRunner.query(`CREATE TYPE "public"."drone_state_enum" AS ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING')`);
        await queryRunner.query(`CREATE TABLE "drone" ("id" SERIAL NOT NULL, "serial_number" character varying(100) NOT NULL, "model" "public"."drone_model_enum" NOT NULL DEFAULT 'Lightweight', "weight_limit" smallint NOT NULL, "battery" smallint NOT NULL, "state" "public"."drone_state_enum" NOT NULL DEFAULT 'IDLE', "medicationId" integer, CONSTRAINT "REL_0cc4ebb02300454252a639a9ce" UNIQUE ("medicationId"), CONSTRAINT "PK_2ac525cb1c63c95423e754dd41f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "drone" ADD CONSTRAINT "FK_0cc4ebb02300454252a639a9ceb" FOREIGN KEY ("medicationId") REFERENCES "medication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "drone"`);
        await queryRunner.query(`ALTER TABLE "drone" DROP CONSTRAINT "FK_0cc4ebb02300454252a639a9ceb"`);
        await queryRunner.query(`DROP TABLE "drone"`);
        await queryRunner.query(`DROP TYPE "public"."drone_state_enum"`);
        await queryRunner.query(`DROP TYPE "public"."drone_model_enum"`);
        await queryRunner.query(`DELETE FROM "medication"`);
        await queryRunner.query(`DROP TABLE "medication"`);
    }

}
