import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class BudgetAmount1730660771595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'budgets',
      new TableColumn({
        name: 'balance',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0.0,
      }),
    );
    await queryRunner.addColumn(
      'budgets',
      new TableColumn({
        name: 'version',
        type: 'integer',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('budgets', 'balance');
  }
}
