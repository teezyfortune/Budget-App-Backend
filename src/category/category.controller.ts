import { Body, Controller, Post, Response } from '@nestjs/common';
import { CreateCategoryDto } from './dto/creat-category.dto';

@Controller('category')
export class CategoryController {
  constructor() {}
  @Post()
  async addCategory(@Body() createCatdto: CreateCategoryDto, @Response() res) {
    return res.send(createCatdto);
  }
}
