import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey} from "typeorm";

export class initial1562715411719 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "title" RENAME TO "name"`);
        await queryRunner.createTable(new Table({
            name: "question",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true)        
        
        await queryRunner.createIndex("question", new TableIndex({
            name: "IDX_QUESTION_NAME",
            columnNames: ["name"]
        }));
        
        await queryRunner.createTable(new Table({
            name: "answer",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true);
        
        await queryRunner.addColumn("answer", new TableColumn({
            name: "questionId", 
            type: "int" 
        }));
        
        await queryRunner.createForeignKey("answer", new TableForeignKey({
            columnNames: ["questionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "question",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable("question");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("questionId") !== -1);
        await queryRunner.dropForeignKey("question", foreignKey);
        await queryRunner.dropColumn("question", "questionId");
        await queryRunner.dropTable("answer");
        await queryRunner.dropIndex("question", "IDX_QUESTION_NAME");
        await queryRunner.dropTable("question");
    }

}
