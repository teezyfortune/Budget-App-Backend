import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(@Inject() private txService: TransactionsService) {}

  @Post()
  async save(
    @Body() txData: CreateTransactionDto,
    @Request() req: any,
    @Response() res: any,
  ) {
    await this.txService.save({ ...txData, user: req.user.id });
    res.status(HttpStatus.CREATED).json({ message: 'Transaction created' });
  }

  @Get()
  async findAll(@Request() req: any, @Response() res: any) {
    const result = await this.txService.findAllById(req.user.id);
    res
      .status(HttpStatus.OK)
      .json({ message: 'Transactions found', data: result });
  }

  @Get(':txID')
  async findOne(
    @Request() req: any,
    @Response() res: any,
    @Body('id') id: string,
  ) {
    const result = await this.txService.findOne(id);
    res
      .status(HttpStatus.OK)
      .json({ message: 'Transaction found', data: result });
  }
}
