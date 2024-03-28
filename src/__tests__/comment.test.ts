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
 
describe("/api/blogs/65f942f8dbfad202234257b8/comments",() => {
    try{
        it("Should return status code 200 to indicate ok",async() => {
            const res:Response =await request.get("/api/blogs/65f942f8dbfad202234257b8/comments");
            expect(res.status).toBe(200)
        })   
    }catch(err:any){
        throw new Error(err.message);
    }
})
   