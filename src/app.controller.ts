import { Get, Controller, Post, Response, Param, HttpStatus, Request } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	root(): string {
    return 'Hello World!';
  }
  @Get('/user/:id')
  user(@Response() res, @Param('id') id) {
    console.log(id)
    res.status(HttpStatus.OK).json({
      name: 'hello',
      age: 20
    });
  }
}
