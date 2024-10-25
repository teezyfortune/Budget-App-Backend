import { Test, TestingModule } from '@nestjs/testing';
import { BudgetService } from './budget.service';

describe('Budget', () => {
  let provider: BudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetService],
    }).compile();

    provider = module.get<BudgetService>(BudgetService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
