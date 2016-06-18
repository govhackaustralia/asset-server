/** Attribution: https://gist.github.com/mikestreety/9525414 **/

// Define gulp before we start
const gulp = require('gulp');

// Define Sass and the autoprefixer
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');            // does css vendor prefixes
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

// This is an object which defines paths for the styles.
// Can add paths for javascript or images for example
// The folder, files to look for and destination are all required for sass
var paths = {

    styles: {
		src: './src/sass',
		files: './src/sass/**/*.scss',
		dest: './public/css'
	},
    
    scripts: [{
		files: './src/js/site-switcher/*.js',
        dest: './public/js'
    }]

}

// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
var displayError = (error) => {

    // Initial building up of the error
    let errorString = `[${error.plugin} ${error.message.replace("\n",'')}]`;    // Removes new line at the end
    
    // If the error contains the filename or line number add it to the string
	if(error.fileName) errorString += ` in ${error.fileName}`;
	if(error.lineNumber) errorString += ` on line ${error.lineNumber}`;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
	console.error(errorString);
}


//
// Setting up the sass task
//
gulp.task('sass', () => {
    // Taking the path from the above object
    // Sass options - make the output compressed and add the source map
    // Also pull the include path from the paths object
    // If there is an error, don't stop compiling but use the custom displayError function
    // Pass the compiled sass through the prefixer with defined 
    // Funally put the compiled sass into a css file
	gulp.src(paths.styles.files)
        .pipe(sass({
            outputStyle: 'expanded',
            // outputStyle: 'compressed',
            // sourceComments: 'map',
            includePaths : [paths.styles.src]
        }))
        .pipe(prefix(
            'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
        ))
        .pipe(gulp.dest(paths.styles.dest))
        .on('error', (err) => {
            displayError(err);
        });
});


//
// Setting up the js task
//
gulp.task('js', () => {
    
    if (paths.scripts instanceof Array){
        paths.scripts.forEach(function(scriptFolder){
            gulp.src(scriptFolder.files)
                .pipe(babel())
                .pipe(rename({ suffix: '.min' }))
                .pipe(uglify().on('error', (err) => {
                    displayError(err);
                }))
                .pipe(gulp.dest(scriptFolder.dest))
                .on('error', (err) => {
                    displayError(err);
                });
        });
    }
    else {
        gulp.src(paths.scripts.files)
            .pipe(babel())
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify().on('error', (err) => {
                displayError(err);
            }))
            .pipe(gulp.dest(paths.scripts.dest))
            .on('error', (err) => {
                displayError(err);
            });
    }

});




// This is the default task - which is run when `gulp` is run
// The tasks passed in as an array are run before the tasks within the function
gulp.task('default', ['sass', 'js'], () => { 

    /** Deps will run once automagically **/
    
    // Watch the files in the paths object, and when there is a change, fun the functions in the array
    // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
	// gulp.watch(paths.styles.files, ['sass']).on('change', (evt) => {
		// console.log(`[watcher] File  ${evt.path.replace(/.*(?=sass)/,'')} was ${evt.type} , compiling...`);
	// });
    
});
