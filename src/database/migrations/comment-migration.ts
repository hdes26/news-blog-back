import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1690552540964 implements MigrationInterface {
  name = 'Migration1690552540964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying(255) NOT NULL, "comment_date" TIMESTAMP NOT NULL DEFAULT now(), "news" integer, "author" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_2891d412a4c04124f07973d39ce" FOREIGN KEY ("news") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_d5b5ce13b7dc246707937a9ced2" FOREIGN KEY ("author") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_d5b5ce13b7dc246707937a9ced2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_2891d412a4c04124f07973d39ce"`,
    );
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
