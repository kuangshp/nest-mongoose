import * as mongoose from 'mongoose';

export const BookListSchema = new mongoose.Schema({
  name: String,
  price: Number
});