import { Controller, Inject, Post, Request } from '@nestjs/common';
import { TodoService } from './dynamo-db.service';
import { Request as request } from 'express';

@Controller('todo')
export class TodoController {
  constructor(@Inject(TodoService) private todoService: TodoService) {}

  @Post()
  async createItem(@Request() req: request): Promise<any> {
    const data = await this.todoService.createItem(req.body);
    return data;
  }
}
