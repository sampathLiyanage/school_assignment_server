const School = require('../../lib/models/school.model');
const testHelper = require('../testHelper');
const modelTestHelper = require('../model.testHelper');

describe('School Model Create Test', () => {
    beforeAll( () => {
        testHelper.connectToMongoDB();
    });

    const stringWith100Chars = testHelper.generateRandomString(100);
    const stringWith101Chars = testHelper.generateRandomString(101);
    const stringWith1000Chars = testHelper.generateRandomString(1000);
    const stringWith1001Chars = testHelper.generateRandomString(1001);
    const testDataForSchoolCreation = [
        {title: 'valid school name', inputData: {name: 'test name'}, expectedModelProperties: {name: 'test name'}},
        {title: 'valid school name - to be trimmed', inputData: {name: ' test name '}, expectedModelProperties: {name: 'test name'}},
        {title: 'school name value is not empty', inputData: {name: ''}, error: "School validation failed: name: required"},
        {title: 'school name value is not set', inputData: {}, error: "School validation failed: name: required"},
        {title: 'name length is 100', inputData: {name: stringWith100Chars}, expectedModelProperties: {name: stringWith100Chars}},
        {title: 'name length is greater than 100', inputData: {name: stringWith101Chars}, error: 'School validation failed: name: maximum length is 100'},
        {title: 'address is empty', inputData: {name: 'test name', address: ''}, expectedModelProperties: {name: 'test name', address: ''}},
        {title: 'address is valid string', inputData: {name: 'test name', address: 'test address'}, expectedModelProperties: {name: 'test name', address: 'test address'}},
        {title: 'address is to be trimmed', inputData: {name: 'test name', address: ' test address '}, expectedModelProperties: {name: 'test name', address: 'test address'}},
        {title: 'address length is 1000', inputData: {name: 'test name', address: stringWith1000Chars}, expectedModelProperties: {name: 'test name', address: stringWith1000Chars}},
        {title: 'address length is 1001', inputData: {name: 'test name', address: stringWith1001Chars}, error: 'School validation failed: address: maximum length is 1000'},
        {title: 'number of students is valid', inputData: {name: 'test name', address: 'test address', noOfStudents: 123}, expectedModelProperties: {name: 'test name', address: 'test address', noOfStudents: 123}},
        {title: 'number of students is a string', inputData: {name: 'test name', address: 'test address', noOfStudents: 'test'}, error: 'School validation failed: noOfStudents: Cast to Number failed for value "test" at path "noOfStudents"'},
    ];

    testDataForSchoolCreation.forEach((testData) => {
        modelTestHelper.testModelCreation( () => {return (new School(testData.inputData)).save()}, testData);
    });
})