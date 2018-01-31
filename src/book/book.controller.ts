import { Get, Controller, HttpStatus, Response, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) { }

  // 新增一条数据
  @Post()
  async createBook( @Body() book) {
    return this.bookService.createBook(book);
  }

  @Get()
  async getAllBook() {
    return this.bookService.getAllBook();
  }
}