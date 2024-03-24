const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./index')

chai.use(chaiHttp)
const expect = chai.expect

describe('API Tests', function () {
  it('Deberia obtener la lista de archivos', (done) => {
    chai.request(app)
      .get('/files/list')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body.files).to.be.an('array')
        done()
      })
  })

  it('Debería obtener los datos de un archivo específico', (done) => {
    chai.request(app)
      .get('/files/data?fileName=test3.csv')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        done()
      })
  })
})
