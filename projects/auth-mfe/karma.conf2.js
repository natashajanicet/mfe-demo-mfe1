// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      files: [
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/@ng-select/ng-select/themes/default.theme.css',
        'src/scss/styles.scss',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/popper.js/dist/umd/popper.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js'
      ],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage-istanbul-reporter'),
        require('@angular-devkit/build-angular/plugins/karma'),
        require('karma-scss-preprocessor')
      ],
      client: {
        clearContext: false, // leave Jasmine Spec Runner output visible in browser,
        jasmine: {
          random: false
        }
      },
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, './coverage'),
        reports: ['html', 'lcovonly', 'text-summary'],
        fixWebpackSourcePaths: true
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: ['--disable-web-security', '--no-sandbox']
        }
      },
      singleRun: false,
      restartOnFileChange: true,
      preprocessors: {
        'src/**/*.scss': ['scss']
      },
      scssPreprocessor: {
        options: {
          sourceMap: true
        }
      }
    });
  };