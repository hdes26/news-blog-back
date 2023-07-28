import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1690503053358 implements MigrationInterface {
  name = 'Migration1690503053358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "news_date" SET DEFAULT '"2023-07-28T00:10:56.182Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "news_date" SET DEFAULT '2023-07-27 23:45:41.466+00'`,
    );
  }
}
