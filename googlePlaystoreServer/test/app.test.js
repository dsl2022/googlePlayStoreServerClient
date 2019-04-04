const expect = require('chai').expect;
const request = require('supertest')
const app = require('../app')

describe('GET/apps',()=>{
  let genreArray= ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].map(genre=> genre.toLowerCase())

  
  

  it('should return an array of apps',()=>{
    return request(app)
    .get('/apps')
    
    .expect('Content-Type',/json/)
    .expect(200)
    
   
    .then(res=>{
      
      
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf.at.least(1);
      const app = res.body[0];
      expect(app).to.include.all.keys('App',
      'Category',
      'Rating',
      'Reviews',
      'Size',
      'Installs',
      'Type',
      'Price',
      'Content Rating',
      'Genres',
      'Last Updated',
      'Current Ver',
      'Android Ver')

    })
  })

  it('should be 400 if sort is incorrect',()=>{
    return request(app)
    .get('/apps')
    .query({sort:'MISTAKE'})
    .expect(400,'Sort must be one of title or rank')
  })

  it('should be 400 if genre is incorrect',()=>{
    return request(app)
    .get('/apps')
    .query({genre:'MISTAKE'})
    .expect(400,`Sort must be one of followings\n ${genreArray.join(' or ')}`)
  })
})