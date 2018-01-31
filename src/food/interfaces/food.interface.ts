import { Document } from 'mongoose';

export interface Food extends Document {
  readonly foodName: String,
  readonly price: Number
}