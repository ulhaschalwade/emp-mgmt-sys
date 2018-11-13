const assert = require('chai').assert;
const expect = require('chai').expect;
const baseUri = 'http://localhost:3000';
const request = require('request');

describe('User', () => {
    describe('Get External Users', () => {
        it('should return all git users', (done) => {
            request.get({ uri: baseUri + '/api/user/external' }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            })
        }).timeout(5000)
        it(`should return user with username 'ulhaschalwade'`, (done) => {
            request.get({ uri: baseUri + '/api/user/external/ulhaschalwade' }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                let value = JSON.parse(body);
                let user = JSON.parse(value);
                expect(user).to.be.an('object');
                expect(user).to.have.property('login', 'ulhaschalwade');
                done();
            })
        }).timeout(5000);
        it(`should return status code as 404`, (done) => {
            request.get({ uri: baseUri + '/api/user/external/ulhaschalwade1' }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                let result = JSON.parse(body);
                let user = JSON.parse(result);
                expect(user).to.have.property('message', 'Not Found');
                done();
            })
        }).timeout(5000);
    })
})