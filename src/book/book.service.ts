import { Component, Inject } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Component()
export class BookService {
  constructor(@Inject('BookModelToken') private readonly bookModel) {}

  async createBook(book) {
    const createdCat = new this.bookModel(book);
    return await createdCat.save();
  }

  // 查询全部的数据
  async getAllBook() {
    return await this.bookModel.find().exec();
  }
}