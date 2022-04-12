export const copy = () => {
  app.gulp.src(app.path.src.vendor)
    .pipe(app.gulp.dest(app.path.buildFolder))

  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
};
