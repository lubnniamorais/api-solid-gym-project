import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Create Gym (E2E)', async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '+55 81 988776655',
        latitude: -8.2723789,
        longitude: -35.9478861,
      });

    expect(response.statusCode).toEqual(201);
  });
});
