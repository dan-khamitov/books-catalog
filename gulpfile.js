var changed = require('gulp-changed');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var stylus = stylus || require('gulp-stylus');
var minifyCss = require('gulp-minify-css');
var nib = require('nib');
var concatCss = require('gulp-concat-css');


var sources = {
    appDir: 'app',
    jade: {
        index: 'app/index.jade',
        templates: 'app/pages/**/*.jade'
    },
    appJS: [
        'app/main.js',
        'app/factories/*.js',
        'app/pages/**/*.js'
    ],
    vendorJS: [
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-material/angular-material.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-resource/angular-resource.js'

    ],
    styles: {
        appStyles: [
            'app/common.styl',
            'app/pages/**/*.styl'
        ],
        vendorStyles: 'bower_components/angular-material/angular-material.min.css'
    }
};

var dist = {
    path: 'app/dist'
};

gulp.task('index_page', function () {

        return gulp.src(sources.jade.index)
            .pipe(changed(sources.appDir, {extension: '.html'}))
            .pipe(jade({pretty: false}))
            .pipe(minifyHTML({empty: true, spare: true}))
            .pipe(gulp.dest(''));

    });

gulp.task('vendor_js', function () {

        return gulp.src(sources.vendorJS)
            .pipe(concat('vendors.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(dist.path))
            .on('error', console.log);

    });

gulp.task('app_js', function () {

        return gulp.src(sources.appJS)
            .pipe(concat('app.min.js'))
            .pipe(gulp.dest(dist.path))
            .on('error', console.log);

    });

gulp.task('jade_templates', function () {

    return gulp.src(sources.jade.templates)
        .pipe(changed(sources.jade.templates, {extension: '.html'}))
        .pipe(jade({pretty: false}))
        .pipe(minifyHTML({
            empty: true,
            spare: true
        }))
        .pipe(templateCache({
            module: 'app.templates',
            standalone: true
        }))
        .pipe(concat('app_templates.js'))
        .pipe(gulp.dest(dist.path))

});

gulp.task('stylus', function () {

    return gulp.src(sources.styles.appStyles)
        .pipe(changed(dist.path))
        .pipe(concat('app.min.styl'))
        .pipe(stylus({use: [nib()], compress: true}))
        .pipe(minifyCss())
        .pipe(gulp.dest(dist.path));

});

gulp.task('vendor_css', function () {

    gulp.src(sources.styles.vendorStyles)
        .pipe(concatCss('vendor.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(dist.path));
});

gulp.task('watch', function () {

        gulp.watch(sources.jade.index, ['index_page']);
        gulp.watch(sources.appJS, ['app_js']);
        gulp.watch(sources.jade.templates, ['jade_templates']);
        gulp.watch(sources.styles.appStyles, ['stylus']);

    });

gulp.task('default', function () {

        gulp.start('index_page');
        gulp.start('app_js');
        gulp.start('jade_templates');
        gulp.start('stylus');
        gulp.start('watch');

});

gulp.task('vendor', function () {

        gulp.start('vendor_js');
        gulp.start('vendor_css');

});