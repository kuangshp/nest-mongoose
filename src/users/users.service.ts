import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Component()
export class UsersService {
  private users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Alice Caeiro" },
    { id: 3, name: "Who Knows" },
  ];
  getAllUsers() {
    return Promise.resolve(this.users);
  }
  getUser(id: number) {
    const user = this.users.find(user => user.id === id)
    if (!user) {
      throw new HttpException("user not found", 404)
    }
    return Promise.resolve(user);
  }
  addUser(user) {
    this.users.push(user)
    return Promise.resolve(user)
  }
}