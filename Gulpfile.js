'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf');

// Modules for webserver and livereload
var refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (not starting it yet)
var server = require('./server.js');
// Add live reload
server.use(livereload({port: livereloadport}));

// Because I like HTML5 pushstate .. this redirects everything back to our index.html
//server.all('/*', function(req, res) {
//    res.sendfile('index.html', { root: 'dist' });
//});

// Dev task
gulp.task('dev', ['clean', 'views', 'styles', 'lint', 'browserify'], function () {
});

// Clean task
gulp.task('clean', function () {
    gulp.src('dist/views', {read: false}) // much faster
        .pipe(rimraf({force: true}));
});

// JSHint task
gulp.task('lint', function () {
    gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function () {

    gulp.src(['app/nav/*'])
        .pipe(gulp.dest('dist/nav/'));

    gulp.src(['app/css/*.css', 'node_modules/bootstrap/dist/css/bootstrap.css', 'node_modules/bootstrap/dist/css/bootstrap.css.map'])
        .pipe(gulp.dest('dist/css/'));

    gulp.src(['node_modules/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest('dist/fonts/'));
});

// Browserify task
gulp.task('browserify', function () {
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
    gulp.src(['./app/js/app.js'])
        .pipe(browserify({

            shim: {

                jQuery: {
                    path: "./node_modules/jquery/dist/jquery.js",
                    exports: "$"
                },

                bootstrap: {
                    path: "./node_modules/bootstrap/dist/js/bootstrap.js",
                    exports: null,
                    depends: {
                        jQuery: 'jQuery'
                    }
                },

                angular: {
                    path: './node_modules/angular/angular.js',
                    exports: 'angular'
                },


                'angular-route': {
                    path: './node_modules/angular-route/angular-route.js',
                    exports: 'ngRoute',
                    depends: {
                        angular: 'angular'
                    }
                }
            },

            insertGlobals: true,
            debug: true
        }))
        // Bundle to a single file
        .pipe(concat('bundle.js'))
        // Output it to our dist folder
        .pipe(gulp.dest('./dist/js'));
});

// Views task
gulp.task('views', function () {
    // Get our index.html
    gulp.src('./app/index.html')
        // And put it in the dist folder
        .pipe(gulp.dest('dist/'));

    // Any other view files from app/views
    gulp.src('./app/views/**/*')
        // Will be put in the dist/views folder
        .pipe(gulp.dest('./dist/views/'));
});

gulp.task('watch', ['lint'], function () {
    // Start webserver
    server.listen(serverport);
    // Start live reload
    refresh.listen(livereloadport);

    // Watch our scripts, and when they change run lint and browserify
    gulp.watch(['./app/js/*.js', './app/js/**/*.js'], [
        'lint',
        'browserify'
    ]);
    // Watch our css files
    gulp.watch(['app/css/**/*.css'], [
        'styles'
    ]);

    gulp.watch(['app/**/*.html'], [
        'views'
    ]);

    gulp.watch('dist/**').on('change', refresh.changed);

});

gulp.task('default', ['dev', 'watch']);