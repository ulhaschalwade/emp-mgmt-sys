const testServer = require('.././server');
const config = require('config');

before((done) => {
    done();
})

after(async (done) => {
    await testServer.shutdownServer();
    console.log(`Server closed after running test cases..`);
    done();
    // let server = testServer.emsApp.listen(config.get("PORT_NUMBER"));
    // server.close(() => {
    //     console.log(`Server closed after running test cases..`);
    //     done();
    // });
})
