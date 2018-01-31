import { Connection } from 'mongoose';
import { FoodSchema } from './schemas/food.schema';


export const foodProviders = [
  {
    provide: 'FoodModelToken',
    useFactory: (connection: Connection) => connection.model('food', FoodSchema),
    inject: ['DbConnectionToken'],
  },
];
