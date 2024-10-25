import {
  Controller,
  Post,
  Response,
  Body,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { Response as response } from 'express';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { JwtAuthGuard } from 'src/auth/auth.auth-guards';
import { GetUserToken } from 'src/auth/aut.get-user.decorator';

@Controller('budget')
@UseGuards(JwtAuthGuard)
export class BudgetController {
  constructor(private budegtService: BudgetService) {}

  @Post()
  @HttpCode(201)
  async createBudget(
    @Body() createdBudget: CreateBudgetDto,
    @GetUserToken() user: any,
    @Response() res: response,
  ) {
    await this.budegtService.save({ ...createdBudget, user: user.sub });
    res
      .status(HttpStatus.CREATED)
      .json({ status: 'success', message: 'Budget created successfully' });
  }
}
