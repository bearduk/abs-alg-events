let mix = require('laravel-mix');

mix.sass('src/sass/app.scss', 'dist/css')
   .js('src/js/app.js', 'dist/js')
   .browserSync({
      proxy: 'knav.dev',
      files: ["dist/css/*.css", "dist/js/*.js"]
   });
