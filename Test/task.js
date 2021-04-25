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

  describe('Get all the Products', () => {
    it('It should GET all the tasks', (done) => {
      chai.request(server)
        .get('/api/products')
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
    it('It should post a new Product', (done) => {
      const newAvenger = {
        name: 'Face Shield',
        description: 'Good Mask',
        price: 120,
        category: 'Covid Care',
        isAvailable: 'true',
        imgUrl: 'sdsURL',

      };
      chai.request(server)
        .post('/api/products')
        .send(newAvenger)
        // use token as dummy token inside env variable for tests.
        .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODRiMjcyYWQ0OGE5NDBhYTQ3NmM4OCIsImVtYWlsIjoiZ2F5YW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjE5MzU3MjM5fQ.hd-YxLhLq9puA43fw2uzNIdWR-UU2tGZKdPlseg2Cuc' })
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a('array');
          done();
        });
    });

    it('It should Not post a new Product', (done) => {
      const newAvenger = {
        name: 'Fa',
        description: 'Good Mask',
        price: 120,
        category: 'Covid Care',
        isAvailable: 'true',
        imgUrl: 'sdsURL',

      };
      chai.request(server)
        .post('/api/products')
        .send(newAvenger)
        .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODRiMjcyYWQ0OGE5NDBhYTQ3NmM4OCIsImVtYWlsIjoiZ2F5YW5AZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjE5MzU3MjM5fQ.hd-YxLhLq9puA43fw2uzNIdWR-UU2tGZKdPlseg2Cuc' })
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
