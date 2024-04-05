import jsonwebtoken from 'jsonwebtoken'
import jwt from '../helper/jwt';
import mongoose from "mongoose";
import { Response, SuperTest, Test } from 'supertest';
import {app} from "../server";
import user from '../models/user';
const request: SuperTest<Test> = require('supertest')(app);
beforeAll(async() => {
    await mongoose.connect("mongodb+srv://Irumva:IrumvaEmmanuel97@cluster0.ws2ver4.mongodb.net/");
  });
  
  afterAll(async () => {
    // user.deleteMany([])
    await mongoose.connection.close();
  });
  
   describe("Get all blogs",()=>{
    it("should return status 200 to indicate that  blogs obtained",async() =>{
        const response: Response = await request.get("/api/blogs");
        expect(response.status).toBe(200);
    })
   })
   describe("Get single blog",()=>{
    it("Should return status code 200 to indicate ok for obtained single blog",async() =>{
      const response: Response = await request.get("/api/blogs/6604e66022ee9c4ccf8fc12b");
      expect(response.status).toBe(200);
    })
  })
    let token:any;
  describe('Register a new user',() =>{
    it('should register a new user successfully',async() =>{
      const createUser = {
        username: "admin1",
        isAdmin: true,
        email: "admin2@gmail.com",
        password: "12345671"
      };
      const response = await request.post("/api/v1/users").send(createUser);
      expect(response.status).toBe(200)
    })
  })  
  describe('Log in',() =>{
    it('Should login session successfully',async() =>{
      const loggedInUser = {
        email:"admin2@gmail.com",
        password:"12345671",
      };
      const response:Response = await request.post("/api/v1/users/login")
      .send(loggedInUser);
      expect(response.status).toBe(200);
      token = response.body.token;
    })
   })
  