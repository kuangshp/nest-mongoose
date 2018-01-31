import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { foodProviders } from './food.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FoodController],
  components: [FoodService, ...foodProviders],
})
export class FoodModule { }