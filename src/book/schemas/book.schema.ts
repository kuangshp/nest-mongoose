import * as mongoose from 'mongoose';
import { BookListSchema } from './bookList.schema';

export const BookSchema = new mongoose.Schema({
  name: String,
  bookList: [BookListSchema]
});