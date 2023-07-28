import { MigrationInterface, QueryRunner } from 'typeorm';

export class comments1690554359800 implements MigrationInterface {
  name = 'comments1690554359800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying(255) NOT NULL, "comment_date" TIMESTAMP NOT NULL DEFAULT now(), "news" integer, "author" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
