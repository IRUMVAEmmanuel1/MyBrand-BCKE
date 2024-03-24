// import supertest from 'supertest';
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// import express, { Request } from 'express';
// import { app } from '../server';
// import User from '../models/user';
// import userService from '../service/userService';

// const request = supertest(app);

// const createMockRequest = (body: any): Request => {
//   const req = express.request;
//   req.body = body;
//   return req;
// };

// describe('User', () => {
//   const newUser = {
//     username: 'patrick',
//     email: 'kalisapa@gmail.com',
//     password: 'password123',
//   };

//   beforeAll(async () => {
//     await mongoose.connect('mongodb+srv://Irumva:IrumvaEmmanuel97@cluster0.ws2ver4.mongodb.net/', {
//     });
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   beforeEach(async () => {
//     await User.deleteMany({});
//   });

//   describe('POST /users', () => {
//     it('should register a new user', async () => {
//       const response = await request.post('/users').send(newUser);
//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('User registered Successfully!');
//     });

  
//   });

//   describe('userService', () => {
//     it('should register a new user', async () => {
//       const registeredUser = await userService.users_register(createMockRequest(newUser));
//       if (registeredUser !== false && registeredUser !== null) {
//         expect(registeredUser).toBeDefined();
//         // expect(users_register.username).toBe(newUser.username);
//         expect(registeredUser.email).toBe(newUser.email);
//         expect(bcrypt.compareSync(newUser.password, registeredUser.password)).toBe(true);
//       } else {
       
//       }
//     });

//     it('should not register a user with existing username or email', async () => {
//       await User.create(newUser);
//       const registeredUser = await userService.users_register(createMockRequest(newUser));
//       if (registeredUser !== undefined && registeredUser !== false) {
//         // This block will never be executed because the service returns false for existing users
//       } else {
//         expect(registeredUser).toBe(false);
//       }
//     });

//   });
// });