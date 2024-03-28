import jsonwebtoken from 'jsonwebtoken'
import jwt from '../helper/jwt';
import mongoose from "mongoose";
import { Response, SuperTest, Test } from 'supertest';
import {app} from "../server";
const request: SuperTest<Test> = require('supertest')(app);
beforeAll(async() => {
    await mongoose.connect("mongodb+srv://Irumva:IrumvaEmmanuel97@cluster0.ws2ver4.mongodb.net/");
  });
  afterAll(async () => {
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
      const response: Response = await request.get("/api/blogs/660456616f460c7fb81e2c52");
      expect(response.status).toBe(200);
    })
  })
    let token:any;
  describe('Log in',() =>{
    it('Should login session successfully',async() =>{
      const loggedInUser = {
        email:"admin@gmail.com",
        password:"12345679",
      };
      const response:Response = await request.post("/api/v1/users/login")
      .send(loggedInUser);
      expect(response.status).toBe(200);
      token = response.body.token;
    })
   })
  