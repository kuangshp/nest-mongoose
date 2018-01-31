>作为后端语言开发自然要连接数据库,对数据的增删改查,目前`nest`提供可以连接的数据库有`mySQL`和`mongoDB`,[官网地址](https://docs.nestjs.com/techniques/sql),本文介绍使用`nest`连接`mongoDB`数据库,官网介绍也很简单,[官网提供的案例](https://github.com/nestjs/nest/tree/master/examples/06-mongoose)

### 一、使用步骤
* 1、安装依赖包

    ```javascript
    npm install --save @nestjs/mongoose mongoose
    ```
    
* 2、在项目中创建一个`database`作为数据库连接的文件/或者叫包
    * `database.providers.ts`类似`angular`中使用工厂的方式把数据库连接池注入到项目中

        ```javascript
        import * as mongoose from 'mongoose';

        export const databaseProviders = [
          {
            provide: 'DbConnectionToken',
            useFactory: async (): Promise<mongoose.Connection> =>
              await mongoose.connect('mongodb://localhost/nest'),
          },
        ];
        ```
    * `database.module.ts` 就是一个导入连接池与导出的`module`文件

        ```javascript
        import { Module } from '@nestjs/common';
        import { databaseProviders } from './database.providers';
        
        @Module({
          components: [...databaseProviders],
          exports: [...databaseProviders],
        })
        export class DatabaseModule {}
        ```
* 3、根据官网的创建一个`cats`的文件夹存放关于`cat`的全部信息
* 4、根据上文中介绍的要创建几个基础文件然后注入到`cats.module.ts`中,再将`cats.module.ts`注入到`app.module.ts`中
* 5、在文件夹下创建一个新的文件夹和文件(俗称`App`)
    * `dto`文件夹
    * `interfaces`文件夹
    * `schemas`文件夹,创建本`App`的`schema`
    * `cats.providers.ts`把`database`中的`database.providers.ts`与本文件夹下的`schema`相关联(使用`useFactory`依赖注入的方式)

* 6、`schemas`的书写(数据建模)

    ```javascript
    import * as mongoose from 'mongoose';
    
    export const CatSchema = new mongoose.Schema({
      name: String,
      age: Number,
      breed: String,
    });
    ```
    
* 7、`interfaces`的书写(接口约束数据类型)

    ```javascript
    import { Document } from 'mongoose';
    
    export interface Cat extends Document {
      readonly name: string;
      readonly age: number;
      readonly breed: string;
    }
    ```
    
* 8、`dto`的书写(也是约束数据类型的)

    ```javascript
    export class CreateCatDto {
      readonly name: string;
      readonly age: number;
      readonly breed: string;
    }
    ```
    
* 9、`cats.providers.ts`的书写(关键点)

    ```javascript
    import { Connection } from 'mongoose';
    // 引入schema
    import { CatSchema } from './schemas/cat.schema';
    
    export const catsProviders = [
      {
        // 自己定义一个到时候在service.ts中注入
        provide: 'CatModelToken', 
        // 使用CatSchema
        useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
        // DbConnectionToken是database.providers.ts里面的key
        inject: ['DbConnectionToken'],
      },
    ];
    ```
    
* 10、关于`cats.service.ts`的书写

    ```javascript
    import { Model } from 'mongoose';
    import { Component, Inject } from '@nestjs/common';
    import { Cat } from './interfaces/cat.interface';
    import { CreateCatDto } from './dto/create-cat.dto';
    
    @Component()
    export class CatsService {
      // 注入的CatModelToken要与cats.providers.ts里面的key一致就可以
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
    ```
    
* 11、参考代码(组件`cats`和`food`)

### 二、简单的写法(不写约束数据类型)

* 1、创建一个`book.providers.ts`和`schema`文件夹
* 2、参考代码(组件`book`)
