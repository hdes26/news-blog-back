import { MigrationInterface, QueryRunner } from 'typeorm';

export class constraints1690554506100 implements MigrationInterface {
  name = 'constraints1690554506100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_2b25d3952694bca90d83e2342bd" FOREIGN KEY ("author") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_483357ee336032c4244d335c179" FOREIGN KEY ("label") REFERENCES "label"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_2e612e944ee6d20447876ca04a1" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_2e612e944ee6d20447876ca04a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_483357ee336032c4244d335c179"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_2b25d3952694bca90d83e2342bd"`,
    );
  }
}
