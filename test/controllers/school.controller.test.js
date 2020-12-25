const schoolController = require('../../lib/controllers/school.controller')
const schoolModel = require('../../lib/models/school.model')
const testHelper = require('../testHelper');
const sinon = require('sinon');

describe('School Create Test', () => {
    beforeAll( async () => {
        await testHelper.connectToMongoDB();
        await schoolModel.remove({});
    });

    const stringWith100Chars = testHelper.generateRandomString(100);
    const stringWith101Chars = testHelper.generateRandomString(101);
    const stringWith1000Chars = testHelper.generateRandomString(1000);
    const stringWith1001Chars = testHelper.generateRandomString(1001);
    const testCases = [
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

    for (let i=0; i<testCases.length; i++) {
        let testData = testCases[i];
        it(testData.title, async () => {
            let req = { body: testData.inputData };
            let fakeSendMethod = sinon.fake();
            let fakeStatusMethod = sinon.fake.returns({send: fakeSendMethod});
            let res = {status: fakeStatusMethod, send: fakeSendMethod};
            await schoolController.create(req, res);
            expect(fakeSendMethod.callCount).toBe(1);
            if (testData.error) {
                expect(fakeStatusMethod.callCount).toBe(1);
                expect(fakeStatusMethod.getCall(0).firstArg).toBe(400);
                expect(fakeSendMethod.getCall(0).firstArg.message).toBe(testData.error);
            } else {
                for (let property in testData.expectedModelProperties) {
                    if (testData.expectedModelProperties.hasOwnProperty(property)) {
                        expect(fakeSendMethod.getCall(0).firstArg[property]).toBe(testData.expectedModelProperties[property]);
                    }
                }
            }
        });
    }
});

describe('School Find Test',  () => {

    const data = [
        {name: 'Sandalwood Middle School', address: '542 Bald Hill Ave Riverview, FL 33569', noOfStudents: 312},
        {name: 'Summit High School', address: '657 W. Annadale St Lemont, IL 6043', noOfStudents: 241},
        {name: 'Freedom Academy', address: '862 Ridge Avenue Hixson, TN 37343', noOfStudents: 1888},
        {name: 'Valley View School of Fine Arts', address: '60 Wellington Street, FL 33510', noOfStudents: 3567},
        {name: 'Westwood Charter School', address: '686 W. Studebaker Ave Petersburg, VA 23803', noOfStudents: 124},
        {name: 'Frozen Lake Academy', address: '52 Longbranch Ave Carlisle, PA 17013', noOfStudents: 542},
        {name: 'Wildwood Conservatory', address: '9315 N. Marvon Dr.Glastonbury, CT 0603', noOfStudents: 541},
        {name: 'Silver Valley Academy', address: '', noOfStudents: 312},
        {name: 'Great Oak School', address: '61 Talbot Road Enterprise, AL 36330'},
        {name: 'Littlewood Technical School'},
        {name: 'Lakeside Grammar School', address: '7269 Cobblestone St.Bel Air, MD 21014', noOfStudents: 68},
        {name: 'Horizon School', address: '88 10th St.Elkhart, IN 46514', noOfStudents: 786},
    ];

    beforeAll( async () => {
        await testHelper.connectToMongoDB();
        await schoolModel.remove({});
        for (let i=0; i<data.length; i++) {
            let school = new schoolModel(data[i]);
            await school.save();
        }
    });

    const testCases = [
        {title: 'fetch all results', filter: {}, returnDataIndexes: [0,1,2,3,4,5,6,7,8,9,10,11]},
        {title: 'fetch all results with offset and limit 1', filter: {offset: 0, limit: 5}, returnDataIndexes: [0,1,2,3,4]},
        {title: 'fetch all results with offset and limit 2', filter: {offset: 3, limit: 7}, returnDataIndexes: [3,4,5,6,7,8,9]},
        {title: 'fetch all results with offset and limit 3', filter: {offset: 0, limit: 0}, returnDataIndexes: [0,1,2,3,4,5,6,7,8,9,10,11]},
        {title: 'fetch all results with offset and limit 4', filter: {offset: 3, limit: 0}, returnDataIndexes: [3,4,5,6,7,8,9,10,11]},
        {title: 'fetch all results with offset and limit 5', filter: {offset: 17, limit: 100}, returnDataIndexes: []},
        {title: 'filter by name 1', filter: {name: 'School'}, returnDataIndexes: [0,1,3,4,8,9,10,11]},
        {title: 'filter by name 2', filter: {name: 'school'}, returnDataIndexes: [0,1,3,4,8,9,10,11]},
        {title: 'filter by name 3', filter: {name: ''}, returnDataIndexes: [0,1,2,3,4,5,6,7,8,9,10,11]},
        {title: 'filter by name 4', filter: {name: 'Wildwood Conservatory'}, returnDataIndexes: [6]},
        {title: 'filter by address 1', filter: {address: 'School'}, returnDataIndexes: []},
        {title: 'filter by address 2', filter: {address: ''}, returnDataIndexes: [0,1,2,3,4,5,6,7,8,10,11]},
        {title: 'filter by address 3', filter: {address: 'Wildwood Conservatory'}, returnDataIndexes: []},
        {title: 'filter by address 4', filter: {address: '33510'}, returnDataIndexes: [3]},
        {title: 'filter by address 5', filter: {address: '657 W. Annadale St Lemont, IL 6043'}, returnDataIndexes: [1]},
        {title: 'filter by name and address 1', filter: {name: 'Horizon', address: '46514'}, returnDataIndexes: [11]},
        {title: 'filter by name and address 2', filter: {name: 'Horizon', address: '21014'}, returnDataIndexes: []},
        {title: 'filter by search 1', filter: {search: ''}, returnDataIndexes: [0,1,2,3,4,5,6,7,8,9,10,11]},
        {title: 'filter by search 2', filter: {search: '37343'}, returnDataIndexes: [2]},
        {title: 'filter by search 2', filter: {search: '542 bald hill ave riverview'}, returnDataIndexes: [0,5,4]},
        {title: 'filter by search and name 1', filter: {name: 'Westwood', search: '542 bald hill ave riverview'}, returnDataIndexes: [4]},
        {title: 'filter by search and name 2', filter: {name: 'Horizon', search: '542 bald hill ave riverview'}, returnDataIndexes: []},
        {title: 'filter by search, name, address 1', filter: {name: 'Westwood', address: 'Studebaker Ave Petersburg', search: '542 bald hill ave riverview'}, returnDataIndexes: [4]},
        {title: 'filter by search, name, address 1', filter: {name: 'Westwood', address: 'Wellington Street', search: '542 bald hill ave riverview'}, returnDataIndexes: []},
    ];

    for (let i=0; i<testCases.length; i++) {
        let testData = testCases[i];
        it(testData.title, async () => {
            let req = { query: testData.filter };
            let fakeSendMethod = sinon.fake();
            let res = {send: fakeSendMethod};
            await schoolController.get(req, res);
            expect(fakeSendMethod.callCount).toBe(1);
            expect(fakeSendMethod.firstArg.length).toBe(testData.returnDataIndexes.length);
            for (let j=0; j<testData.returnDataIndexes.length; j++) {
                let expectedData = data[testData.returnDataIndexes[j]];
                expect(fakeSendMethod.firstArg[j]._id).toBeDefined();
                expect(fakeSendMethod.firstArg[j].createdAt).toBeDefined();
                expect(fakeSendMethod.firstArg[j].updatedAt).toBeDefined();
                expect(fakeSendMethod.firstArg[j].name).toBe(expectedData.name);
                if (typeof expectedData.address !== 'undefined') {
                    expect(fakeSendMethod.firstArg[j].address).toBe(expectedData.address);
                } else {
                    expect(fakeSendMethod.firstArg[j].address).toBeUndefined();
                }
                if (typeof expectedData.noOfStudents !== 'undefined') {
                    expect(fakeSendMethod.firstArg[j].noOfStudents).toBe(expectedData.noOfStudents);
                } else {
                    expect(fakeSendMethod.firstArg[j].noOfStudents).toBeUndefined();
                }
            }
        });
    }
});