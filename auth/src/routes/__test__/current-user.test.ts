import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  const cookie = await global.signin();

  const responce = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  // console.log('current-user', responce.body);
  expect(responce.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const responce = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(401);
  expect(responce.body.currentUser).toEqual(undefined);
});
