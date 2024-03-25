import supertest from 'supertest';
import { app } from '../server';

describe('Blog CRUD Operations', () => {
  let createdBlogId ="65ef0cc7e239bf8e64952654";

  // Test creating a new blog
  describe('POST /api/blog', () => {
    it('should create a new blog', async () => {
      const response = await supertest(app)
        .post('/api/blog')
        .send({
          title: 'Test Blog',
          content: 'This is a test blog content',
          author: 'Test Author',
        })
        .expect(201);

      // Store the ID of the created blog for later use
      createdBlogId = response.body.id;
    });
  });

  // Test getting all blogs
  describe('GET /api/blog', () => {
    it('should return all blogs', async () => {
      await supertest(app).get('/api/blog').expect(200);
    });
  });

  // Test getting a single blog
  describe('GET /api/blog/:id', () => {
    it('should return a single blog', async () => {
      await supertest(app).get(`/api/blog/${createdBlogId}`).expect(200);
    });

    it('should return 404 if blog does not exist', async () => {
      const nonExistentId = '65ef0cc7e239bf8e64952654';
      await supertest(app).get(`/api/blog/${nonExistentId}`).expect(404);
    });
  });

  // Test updating a blog
  describe('PUT /api/blog/:id', () => {
    it('should update an existing blog', async () => {
      await supertest(app)
        .put(`/api/blog/${createdBlogId}`)
        .send({
          title: 'Updated Test Blog',
          content: 'This is an updated test blog content',
          author: 'Updated Test Author',
        })
        .expect(200);
    });

    it('should return 404 if blog does not exist', async () => {
      const nonExistentId = '65ef0cc7e239bf8e64952654';
      await supertest(app)
        .put(`/api/blog/${nonExistentId}`)
        .send({
          title: 'Updated Test Blog',
          content: 'This is an updated test blog content',
          author: 'Updated Test Author',
        })
        .expect(404);
    });
  });

  // Test deleting a blog
  describe('DELETE /api/blog/:id', () => {
    it('should delete an existing blog', async () => {
      await supertest(app).delete(`/api/blog/${createdBlogId}`).expect(204);
    });

    it('should return 404 if blog does not exist', async () => {
      const nonExistentId = '65ef0cc7e239bf8e64952654';
      await supertest(app).delete(`/api/blog/${nonExistentId}`).expect(404);
    });
  });
});
