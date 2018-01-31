import * as mongoose from 'mongoose';

export const FoodSchema = new mongoose.Schema({
  foodName: String,
  price: Number
});