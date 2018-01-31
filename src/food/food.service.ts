import { Component, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/core';
import { Food } from './interfaces/food.interface';
import { CreateFoodDto } from './dto/foo.dto';

@Component()
export class FoodService {
  constructor(@Inject('FoodModelToken') private readonly foodModel: Model<Food>) {}

  // 新增food的service层
  async createFood(createFoodDto: CreateFoodDto): Promise<Food> {
    const createdFood = new this.foodModel(createFoodDto);
    return await createdFood.save();
  }

  // 查询全部的数据
  async getAllFood(): Promise<Food[]> {
    return await this.foodModel.find().exec();
  }
}