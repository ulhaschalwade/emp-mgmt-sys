const gulp = require('gulp');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');

gulp.task('nodemon', (done) => {
    //let started = false;

    return nodemon({
        script: 'server.js'
    })
        .once('start', done)
        // .on('start', () => {
        //     if (!started) {
        //         started = true;
        //         done();
        //     }
        // })
        .on('restart', () => {
            console.log(`Restarting server...`)
        });

});

gulp.task('set-dev-node-env', (done) => {
    process.env.NODE_ENV = 'test';
    done();
});

gulp.task('test', gulp.series(['set-dev-node-env', 'nodemon']), () => {
    console.log('reached')
    global['logger'].info(`process.env.NODE_ENV is set as ${process.env.NODE_ENV}`)
    return gulp.src(['test/**/*.js'])
        .pipe(mocha({ reporter: 'spec', exit: true }))
        .on('error', (error) => {
            global['logger'].error(error);
        })
        .on('end', () => {
            process.exit();
        })
});

