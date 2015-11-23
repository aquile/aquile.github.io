var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');

gulp.task('mincss', function(){
    var fb = gulp.src('main.css');
    fb.pipe(minifyCss());
    fb.pipe(gulp.dest('main'));
    return fb;
});