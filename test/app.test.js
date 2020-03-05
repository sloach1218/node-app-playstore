const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return supertest(app)
          .get('/apps')
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            const book = res.body[0];
            expect(book).to.include.all.keys(
             'App', 'Genres', 'Rating', 'Type'
           );
          });
      })
      it('should be 400 if sort is incorrect', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'MISTAKE' })
          .expect(400, 'Sort must be either rating or app');
      });
      it('should sort by app name', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'App' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;
    
            let i = 0;
            // iterate once less than the length of the array
            // because we're comparing 2 items in the array at a time
            while (i < res.body.length - 1) {
              // compare book at `i` with next book at `i + 1`
              const appAtI = res.body[i];
              const appAtIPlus1 = res.body[i + 1];
              // if the next book is less than the book at i,
              if (appAtIPlus1.App < appAtI.App) {
                // the books were not sorted correctly
                sorted = false;
                break; // exit the loop
              }
              i++;
            }
            expect(sorted).to.be.true;
          });
      });
      it('should sort by app rating', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'Rating' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;
    
            let i = 0;

            while (i < res.body.length - 1) {

              const appAtI = res.body[i];
              const appAtIPlus1 = res.body[i + 1];

              if (appAtIPlus1.Rating > appAtI.Rating) {
                sorted = false;
                break;
              }
              i++;
            }
            expect(sorted).to.be.true;
          });
      });
      it('should return selected Genre', () => {
        return supertest(app)
          .get('/apps')
          .query({ genres: 'Action' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let selected = true;
    
            let i = 0;
            
            while (i < res.body.length - 1) {
              const appAtI = res.body[i].Genres;
              
              if (!appAtI.includes('Action')) {
                
                selected = false;
                break;
              }
              i++;
            }
            expect(selected).to.be.true;
          });
      })
});