import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import ifPlugin from 'gulp-if';
import browserSync from 'browser-sync';

const plugins = {
  replace,
  plumber,
  notify,
  newer,
  if: ifPlugin,
  browserSync,
};

export default plugins;
