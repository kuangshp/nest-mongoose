import { Controller, Get, Post, Response, HttpStatus, Param, Body, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }
  @Get()
  async getAllUser( @Response() res) {
    const users = await this.usersService.getAllUsers();
    res.status(HttpStatus.OK).json(users);
  }

  @Get('/:id')
  getUser( @Response() res, @Param('id') id, @Request() req) {
    console.log(id);
    console.log(req.query)
    this.usersService.getUser(parseInt(id)).then(user => res.status(HttpStatus.OK).json(user));
  }

  @Post()
  addUser( @Response() res, @Request() req) {
    console.log(req.body, '///')
    this.usersService.addUser(req.body).then(result => res.status(HttpStatus.CREATED).json(result));
  }

  @Post('/add')
  addUser1(@Response() res, @Body() user) {
    console.log(user);
    res.status(HttpStatus.CREATED).json(user);
  }
}