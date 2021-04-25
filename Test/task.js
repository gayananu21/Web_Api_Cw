/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {
  /**
     * Test the get route
     */

  describe('Get all the Avengers', () => {
    it('It should GET all the tasks', (done) => {
      chai.request(server)
        .get('/api/avengers')
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a('array');
          done();
        });
    });
    it('It should not GET all the tasks', (done) => {
      chai.request(server)
        .get('/api/')
        .end((err, response) => {
          response.should.have.status(404);
          // response.body.should.be.a('array');
          done();
        });
    });
    it('It should post a new Avenger', (done) => {
      const newAvenger = {
        name: 'Arrow',
        birthName: 'Oliver',
        likeCount: 400,
        Movies: 'Endgame',
        deceased: 'false',
        imgUrl: 'sdsURL',

      };
      chai.request(server)
        .post('/api/avengers')
        .send(newAvenger)
        // use token as dummy token inside env variable for tests.
        .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGE2MTdmOTg0YTc3ZDk2ZTBjZTBiMCIsImVtYWlsIjoiZ2F5YW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjE3MjYxODczfQ.EYjn1OZ6X2x7eJIvv5OesQn18tNqo3U1SEkfh7QJgdE' })
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a('array');
          done();
        });
    });

    it('It should Not post a new Avenger', (done) => {
      const newAvenger = {
        name: 'a',
        birthName: 'Oliver',
        likeCount: 400,
        Movies: 'Endgame',
        deceased: 'false',
        imgUrl: 'sdsURL',

      };
      chai.request(server)
        .post('/api/avengers')
        .send(newAvenger)
        .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGE2MTdmOTg0YTc3ZDk2ZTBjZTBiMCIsImVtYWlsIjoiZ2F5YW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjE3MjYxODczfQ.EYjn1OZ6X2x7eJIvv5OesQn18tNqo3U1SEkfh7QJgdE' })
        .end((err, response) => {
          response.should.have.status(400);
          // response.body.should.be.a('array');
          done();
        });
    });
  });

  /**
     * Test the get by id route
     */
});
