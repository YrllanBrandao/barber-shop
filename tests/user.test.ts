import app from '../server';
import supertest from 'supertest';


describe('Testing if the fild "name" is valid', () => {
  it('shoud return an error message when the fild "name" is invalid', async () => {
    const response = await supertest(app)
      .post('/user')
      .send({ name: '' });
    expect(response.status).toBe(400); 
    expect(response.text).toBe("Bad Request");
  });

  it("should return OK when the fild 'name' is valid", async () =>{

    const response = await supertest(app)
    .post("/user")
    .send({
      nameName: "yrllan",
      lastName: "brandao",
      email: "yrllanbraga@gmail.com",
      password: "test123",

    });

    expect(response).toBe("OK");
  })
});