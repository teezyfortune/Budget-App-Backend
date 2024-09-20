import { Controller, Post, Response, Body, HttpCode } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { Response as response } from 'express';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(private budegtService: BudgetService) {}

  @Post()
  @HttpCode(201)
  async createBudget(
    @Body() createdBudget: CreateBudgetDto,
    @Response() res: response,
  ) {
    await this.budegtService.save(createdBudget);
    res.send('Budget created successfully');
  }
}
