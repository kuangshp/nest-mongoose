import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FoodModule } from './food/food.module';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { BookModule } from './book/book.module';
@Module({
  imports: [],
  modules: [FoodModule, UsersModule, CatsModule, BookModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule { }
