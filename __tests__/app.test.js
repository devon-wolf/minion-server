require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    // test route looking at unprotected seed data
    test('returns responses', async() => {

      const expectation = [
        {
          id: 1,
          regex:	'/banana/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937861/808955633255972894/image0.jpg',
          ],
          owner_id: 1
        },
        {
          id: 2,
          regex: '/love/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809965707101470720/images.png',
          ],
          owner_id: 1
        },
        {
          id: 3,
          regex: '/cry/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809965833613738014/Z.png',
          ],
          owner_id: 1
        },
        {
          id: 4,
          regex: '/funny/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809965934030094366/s-l400.png',
          ],
          owner_id: 1
        },
        {
          id: 5,
          regex: '/old/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809966027685101628/Birthday-Quotes-Top-20-Funny-Birthday-Quotes.png',
          ],
          owner_id: 1
        },
        {
          id: 6,
          regex: '/dead/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809966255514583070/212abc7f24e95d2b11e96f18c78b4ef9.png',
          ],
          owner_id: 1
        },
        {
          id: 7,
          regex: '/phone/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809966385266425886/a43924f9453945829c01b31591f04ea3.png',
          ],
          owner_id: 1
        },
        {
          id: 8,
          regex: '/fuck/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809966538043162654/3ac99fedad8e1efbdacb21c64d93efd0.png',
          ],
          owner_id: 1
        },
        {
          id: 9,
          regex: '/long/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809966696756281354/127670f213927573b07101cb3f971494.png',
          ],
          owner_id: 1
        },
        {
          id: 10,
          regex: '/morning/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809966775122264074/62c026b3e795faa5a520963ab5649f20.png',
          ],
          owner_id: 1
        },
        {
          id: 11,
          regex: '/blessed/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809966872832770078/4f1940cc91fda1dd2c7631ee56cad5d9.png',
          ],
          owner_id: 1
        },
        {
          id: 12,
          regex: '/school/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809967044672880650/714d23317712f3d4b8dcdb99e5671cb8.png',
          ],
          owner_id: 1
        },
        {
          id: 13,
          regex: '/sweet/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809967212299157544/fea64182884d00a64b2a13e02f81be38.png',
          ],
          owner_id: 1
        },
        {
          id: 14,
          regex: '/throw/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809967277591494676/dc5df276ce3b14f3c043e968ea92ff23.png',
          ],
          owner_id: 1
        },
        {
          id: 15,
          regex: '/worries/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809967483821228122/1eb3e11671c23d862a9ca28f92dedff4.png',
          ],
          owner_id: 1
        },
        {
          id: 16,
          regex: '/hate/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809967768874385478/1l0apx.png',
          ],
          owner_id: 1
        },
        {
          id: 17,
          regex: '/gun/ig',
          images: [
            'https://cdn.discordapp.com/attachments/808589409074937863/809967956116897802/426474798-e2f2d7533a66dc4f1c19a38b1d61294d.png',
          ],
          owner_id: 1
        },
      ];

      const data = await fakeRequest(app)
        .get('/responses')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
  });
});
