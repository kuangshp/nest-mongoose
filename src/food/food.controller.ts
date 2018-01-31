import { Get, Controller, HttpStatus, Response, Post, Body } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/foo.dto';
import { Food } from './interfaces/food.interface';

@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) { }

  // 新增一条数据
  @Post()
  async createFood( @Body() createFoodDto: CreateFoodDto): Promise<Food> {
    return this.foodService.createFood(createFoodDto);
  }

  @Get()
  async getAllFood(): Promise<Food[]> {
    return this.foodService.getAllFood();
  }
}