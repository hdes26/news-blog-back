import { MigrationInterface, QueryRunner } from 'typeorm';

export class news1690554256107 implements MigrationInterface {
  name = 'news1690554256107';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "label" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_5692ac5348861d3776eb5843672" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" character varying(255) NOT NULL, "news_date" TIMESTAMP NOT NULL DEFAULT now(), "author" integer, "label" integer, "category" integer, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO label (name, description)
      VALUES
          ('important', 'Noticia importante.'),
          ('warning', 'Lo ultimo en noticias.'),
          ('regular', 'Noticias normal');`,
    );
    await queryRunner.query(
      `INSERT INTO category (name, description)
      VALUES
          ('Internacional', 'Noticias globales y sucesos internacionales.'),
          ('Ciencia y Tecnología', 'Descubrimientos científicos y desarrollos tecnológicos.'),
          ('Cultura y Entretenimiento', 'Arte, música, cine, y todo sobre el mundo del entretenimiento.');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "label"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "news"`);
    await queryRunner.query(`DELETE FROM "label"`);
    await queryRunner.query(`DELETE FROM "category"`);
  }
}
