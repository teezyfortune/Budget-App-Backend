import {
  Controller,
  Post,
  Response,
  Body,
  HttpCode,
  Request,
} from '@nestjs/common';
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
    @Request() req: any,
    @Response() res: response,
  ) {
    await this.budegtService.save({ ...createdBudget, user: req.user.id });
    res.send('Budget created successfully');
  }
}
