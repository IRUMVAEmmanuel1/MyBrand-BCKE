import supertest from 'supertest';
import { app } from '../server';

describe('Blog CRUD Operations', () => {
  let createdBlogId ="65ef0cc7e239bf8e64952654";

  // Test creating a new blog
  describe('POST /api/blogs', () => {
    it('should create a new blog', async () => {
      const response = await supertest(app)
        .post('/api/blogs')
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
  describe('GET /api/blogs', () => {
    it('should return all blogs', async () => {
      await supertest(app).get('/api/blogs').expect(200);
    });
  });

  // Test getting a single blog
  describe('GET /api/blogs/:id', () => {
    it('should return a single blog', async () => {
      await supertest(app).get(`/api/blogs/${createdBlogId}`).expect(200);
    });

    it('should return 404 if blog does not exist', async () => {
      const nonExistentId = '65ef0cc7e239bf8e64952654';
      await supertest(app).get(`/api/blogs/${nonExistentId}`).expect(404);
    });
  });

  // Test updating a blog
  describe('PUT /api/blogs/:id', () => {
    it('should update an existing blog', async () => {
      await supertest(app)
        .put(`/api/blogs/${createdBlogId}`)
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
        .put(`/api/blogs/${nonExistentId}`)
        .send({
          title: 'Updated Test Blog',
          content: 'This is an updated test blog content',
          author: 'Updated Test Author',
        })
        .expect(404);
    });
  });

  // Test deleting a blog
  describe('DELETE /api/blogs/:id', () => {
    it('should delete an existing blog', async () => {
      await supertest(app).delete(`/api/blogs/${createdBlogId}`).expect(204);
    });

    it('should return 404 if blog does not exist', async () => {
      const nonExistentId = '65ef0cc7e239bf8e64952654';
      await supertest(app).delete(`/api/blogs/${nonExistentId}`).expect(404);
    });
  });
});
