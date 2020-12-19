exports.testModelCreation = (creationCallback, testData) => {
    it(testData.title, async () => {
        try {
            let model = await creationCallback();
            expect(testData.error).toBeUndefined();
            expect(model._id).toBeDefined();
            for (let property in testData.expectedModelProperties) {
                if (testData.expectedModelProperties.hasOwnProperty(property)) {
                    expect(model[property]).toBe(testData.expectedModelProperties[property]);
                }
            }
        } catch(e) {
            if (testData.error) {
                expect(e.message).toBe(testData.error);
            } else {
                throw(e);
            }
        }

    });
}