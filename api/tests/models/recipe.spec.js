const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' })
      });
    });
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({ summary: 'Carne de ternera rebozada con salsa de tomate y queso gratinado' });
      });
    });
    describe('healthScore', () => {
      it('should throw an error if healthScore is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid Health Score')))
          .catch(() => done());
      });
      it('should throw an error if healthScore is not between 0 and 100', (done) => {
        Recipe.create({healthScore : 120})
          .then(() => done(new Error('It requires a valid Health Score')))
          .catch(() => done());
      });
      it('should work when its a valid healthScore', () => {
        Recipe.create({ healthScore: 58 });
      });
    });
    describe('steps', () => {
      it('should throw an error if steps is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires valid steps')))
          .catch(() => done());
      });
      it('should work when its a valid steps', () => {
        Recipe.create({ steps: 'Cut the meat' });
      });
    });
  });
});
