import {
  Body,
  Controller,
  Post,
  Response,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/creat-category.dto';
import { CategoryService } from './category.service';
import { GetUserToken } from 'src/auth/aut.get-user.decorator';
import { JwtAuthGuard } from 'src/auth/auth.auth-guards';

@Controller('category')
export class CategoryController {
  constructor(@Inject() private catService: CategoryService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async addCategory(
    @Body() createCatdto: CreateCategoryDto,
    @GetUserToken() user: any,
    @Response()
    res: any,
  ) {
    try {
      await this.catService.save({ ...createCatdto, userId: user.sub });
      console.log(user);

      return res.status(201).json({ message: 'Category created' });
    } catch (e) {
      throw new Error(e);
    }
  }
}
