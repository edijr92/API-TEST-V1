const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('./index');
const { expect } = chai;

chai.use(chaiHttp);

describe('Testing API', ()=> {
  describe('GET /files/data', () => {
    it('it should GET all files data', (done) => {
      chai.request(server)
      .get('/files/data')
      .end((err, response) => {
        response.should.have.status(200);
      done()  
      })
    })
  })
})

// describe('API Tests', () => {
//   it('Should get data from /files/data endpoint', (done) => {
//     chai.request(app)
//       .get('/files/data')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an('array');
//         // Aquí puedes realizar más expectativas sobre la estructura de la respuesta
//         done();
//       });
//   });

//   // Puedes agregar más pruebas para otros endpoints o funcionalidades de la API aquí
// });
// import { expect as _expect, chai} from 'chai';

// const getAPIData = (options) => {
//     return new Promise((resolve, reject) => {
//       const httpRequest = https.request(options, (response) => {
//         let data = '';
//         response.on('data', (chunk) => {
//           data += chunk;
//         });
//         response.on('end', () => {
//           resolve({ statusCode: response.statusCode, data });
//         });
//       });
  
//       httpRequest.on('error', (error) => {
//         reject(error);
//       });
  
//       httpRequest.end();
//     });
//   };

//   describe('API Tests', () => {
//     it('Should get data from /files/data endpoint', async () => {
//       const options = {
//         hostname: 'localhost',
//         port: 8080,
//         path: '/files/data',
//         method: 'GET'
//       };
  
//       try {
//         const { statusCode, data } = await getAPIData(options);
//         _expectexpect(statusCode).to.equal(200);
//         _expect(data).to.be.a('array');
//         // Aquí puedes realizar más expectativas sobre la estructura de la respuesta
//       } catch (error) {
//         throw new Error(error);
//       }
//     });
  
//     // Puedes agregar más pruebas para otros endpoints o funcionalidades de la API aquí
//   });