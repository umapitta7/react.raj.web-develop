// gulpfile.js
const {
  src, dest, series
} = require('gulp');
const del = require('del');
const fs = require('fs');
const dom = require('gulp-dom');
const message = require('gulp-message');
const replace = require('gulp-replace');
const formatHtml = require('gulp-format-html');
const rename = require('gulp-rename');

function copyScripts() {
  const fileContent = fs.readFileSync('./build/index.html', 'utf8');
  const regexPattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
  let match;
  const output = [];
  // eslint-disable-next-line no-cond-assign
  while (match = regexPattern.exec(fileContent)) {
    output.push(match[0]);
  }
  const copyScriptOutput = output.slice(-3).join(' ');
  return src([
    'build/**.html',
    '!build/index.html',
  ])
    // eslint-disable-next-line func-names
    .pipe(dom(function () {
      const html = this.querySelector('body').innerHTML;
      // var pattern =  /<!--\s*startInject:\s*(.+)\s*-->[\s\S]*<!--\s*endInject:\s*\1\s*-->/gi;
      const pattern = /<script data-insert="\s*\b[^>]*>([\s\S]*?)<\/script>/gm;
      const strippedContent = html.replace(pattern, ' ');
      this.querySelector('body').innerHTML = strippedContent + copyScriptOutput;
      return this;
    }))
    .pipe(replace(/^[\r\n]/gm, ' '))
    .pipe(formatHtml())
    .pipe(dest('./build'))
    .on('end', () => {
      message.info('Build scripts are inserted successfully');
    });
}

function replaceScriptTags() {
  return src([
    'build/index.html',
  ])
    .pipe(replace('/static', './static'))
    .pipe(formatHtml())
    .pipe(dest('./build'))
    .on('end', () => {
      message.info('Replacing script tags are completed successfully');
    });
}

function copyBuild() {
  return src('build/**')
    .pipe(dest('./custombuild/reactbuild'))
    .pipe(dest('./custombuild/wcsbuild'))
    .on('end', () => {
      message.info('build completed successfully');
    });
}

function replacWCSPath() {
  return src([
    'custombuild/wcsbuild/pdp.html',
  ])
    .pipe(replace('"static/', '"./wcsstore/RWDStaticAssets/react/static/'))
    .pipe(replace('./static/', './wcsstore/RWDStaticAssets/react/static/'))
    .pipe(formatHtml())
    .pipe(dest('./custombuild/wcsbuild/'));
}

function renameWCSPdpFile() {
  return src([
    'custombuild/wcsbuild/pdp.html'
  ])
    .pipe(rename('index.html'))
    .pipe(dest('custombuild/wcsbuild/'));
}

function cleanWCSPdp() {
  return del(['./custombuild/wcsbuild/**.html', '!custombuild/wcsbuild/index.html']);
}

function replacWCSJSImagePath() {
  return src(['custombuild/wcsbuild/static/js/*.js'])
    .pipe(replace('"static/', '"./wcsstore/RWDStaticAssets/react/static/'))
    .pipe(dest('./custombuild/wcsbuild/static/js/'));
}

function replacWCSCssImagePath() {
  return src(['custombuild/wcsbuild/static/css/*.css'])
    .pipe(replace('static/', './wcsstore/RWDStaticAssets/react/static/'))
    .pipe(dest('./custombuild/wcsbuild/static/css/'));
}

function cleanBuild() {
  return del(['./build']);
}

function cleanWCSJS() {
  return del(['./custombuild/wcsbuild/js']);
}

exports.default = series(replaceScriptTags, copyScripts, copyBuild, replacWCSPath,
  renameWCSPdpFile, cleanWCSPdp, replacWCSJSImagePath, replacWCSCssImagePath, cleanWCSJS,
  cleanBuild);
