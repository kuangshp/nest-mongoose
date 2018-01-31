import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { bookProviders } from './book.providers';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  components: [BookService, ...bookProviders],
})
export class BookModule { }