import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Component()
export class CatsService {
  constructor(@Inject('CatModelToken') private readonly catModel: Model<Cat>) {}

  // 创建数据
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  // 查询全部数据
  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  // 根据id查询
  async findById(_id): Promise<Cat> {
    return await this.catModel.findById(_id).exec()
  }
}
