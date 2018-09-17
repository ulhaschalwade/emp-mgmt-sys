const assert = require('chai').assert;
const expect = require('chai').expect;
const baseUri = "http://localhost:3000";
const request = require('request');
const should = require('should');

describe('Employee', () => {
    let firstEmployeeId = null;
    describe('Cleanup Employee DB', () => {
        it('Delete All employees', (done) => {
            request.delete({ uri: baseUri + '/api/employee' }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
        it("returns all employees should return zero employees", (done) => {
            request.get({ uri: baseUri + '/api/employee/' }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(body).to.deep.equal('[]')
                done();
            })
        })
    })

    describe("Add an employee", () => {
        let firstEmployee = {
            firstName: 'Ulhas',
            lastName: 'Chalawade',
            emailId: 'ulhas.chalawade@globant.com',
            contactNumber: 7709792030,
            designation: 'NA',
            department: "NA"
        }
        let secondEmployee = {
            firstName: 'Ulhas1',
            lastName: 'Chalawade1',
            emailId: 'ulhas.chalawade1@globant.com',
            contactNumber: 7709792031,
            designation: 'NA',
            department: "NA"
        }
        it('add new employee', (done) => {
            request.post({ uri: baseUri + '/api/employee', json: firstEmployee }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(body.firstName).to.equal('Ulhas');
                expect(body.lastName).to.equal('Chalawade');
                expect(body.emailId).to.equal('ulhas.chalawade@globant.com');
                expect(body.contactNumber).to.equal(7709792030);
                expect(body.designation).to.equal('NA');
                expect(body.department).to.equal('NA');
                done();
            })
        })

        it('add another employee', (done) => {
            request.post({ uri: baseUri + '/api/employee', json: secondEmployee }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(body.firstName).to.equal('Ulhas1');
                expect(body.lastName).to.equal('Chalawade1');
                expect(body.emailId).to.equal('ulhas.chalawade1@globant.com');
                expect(body.contactNumber).to.equal(7709792031);
                expect(body.designation).to.equal('NA');
                expect(body.department).to.equal('NA');
                done();
            })
        })
    })

    describe("Get All Employees", () => {
        let getAllEmployeeResult = [];
        it("returns all employees", (done) => {
            request.get({ uri: baseUri + '/api/employee/' }, (error, response, body) => {
                getAllEmployeeResult = body;
                expect(response.statusCode).to.equal(200);
                firstEmployeeId = body[0]['_id'];
                console.log(body);
                console.log(firstEmployeeId)
                done();
            })
        })
    })

    describe("Operations using Id", () => {
        let firstEmployee = [];
        it("returns employee by given id", (done) => {
            request.get({ uri: baseUri + '/api/employee/' + firstEmployeeId }, (error, response, body) => {
                getAllEmployeeResult = body;
                expect(response.statusCode).to.equal(200);
                console.log(body);
                done();
            })
        })
    })
})