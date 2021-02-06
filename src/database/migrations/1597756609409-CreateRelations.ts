import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateRelations1597756609409
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'team',
      new TableForeignKey({
        name: 'managerKey',
        columnNames: ['manager_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'team',
      new TableForeignKey({
        name: 'UserKey',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        name: 'UserTaskKey',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('team', 'managerKey');
    await queryRunner.dropForeignKey('team', 'UserTaskKey');
    await queryRunner.dropForeignKey('task', 'UserKey');
  }
}
