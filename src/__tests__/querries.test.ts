import mongoose from "mongoose";
import dotenv from "dotenv";
import { Response, SuperTest, Test } from 'supertest';
import {app} from "../server";
dotenv.config()
const request: SuperTest<Test> = require('supertest')(app);
beforeAll(async() => {
    await mongoose.connect("mongodb+srv://Irumva:IrumvaEmmanuel97@cluster0.ws2ver4.mongodb.net/");
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
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

describe("Creating new queries",() => {
  const query = {
    user:"admin",
    message:"Better you update your calendar"
  }
  it("Should retrun status code to 201 to idnicate that new query created",async() =>{
    const response: Response = await request.post("/api/querries")
    .send(query);

    expect(response.status).toBe(200);
  })
}) 
  