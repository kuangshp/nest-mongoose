import { Connection } from 'mongoose';
import { BookSchema } from './schemas/book.schema';


export const bookProviders = [
  {
    provide: 'BookModelToken',
    useFactory: (connection: Connection) => connection.model('book', BookSchema),
    inject: ['DbConnectionToken'],
  },
];