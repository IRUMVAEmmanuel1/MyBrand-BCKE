import supertest from 'supertest' 
import {app} from '../server'
describe('blog', () =>{


  describe('get blog route', ()=>{
    describe('given blog does not exist', ()=>{
      it('It should return 404', async()=>{
        const id = '65ef0cc7e239bf8e64952654'
await supertest(app).get(`/api/blog/${id}`).expect(404);

      })
    })
  })
})

describe('blog', () =>{


  describe('get blog route', ()=>{
    describe('given blog does exist', ()=>{
      it('It should return a 200 status', async()=>{
        const id = '65ef0cc7e239bf8e64952654'
await supertest(app).get(`/api/blog/${id}`).expect(404);

      })
    })
  })
})