import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BudgetService } from './budget.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class BudgetMiddleWare implements NestMiddleware {
  constructor(
    private budgetService: BudgetService,
    private authService: AuthService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const found = await this.budgetService.findOneByIdUserId(
        (req.user as any).sub,
        req.body.monthAndYear,
      );
      if (!found) {
        return next();
      }
      throw new ConflictException({
        Status: 'Success',
        message: 'Budget Already exist',
      });
    } catch (e: any) {
      if (e instanceof ConflictException) throw e;
      throw new InternalServerErrorException(e.message);
    }
  }
}
