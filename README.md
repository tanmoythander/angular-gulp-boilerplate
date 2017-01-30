
#AngularJS Front-end development with gulp automation

This project uses best practices and guides with integration of Gulp, Bower, Karma, Mocha with task automation, testing and more.


## Prerequisite

- Install Node
    - on OSX install [home brew](http://brew.sh/) and type `brew install node`
    - on Windows install [chocolatey](https://chocolatey.org/) and type `choco install nodejs`
- On OSX you can alleviate the need to run as sudo by [following these instructions](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md). I highly recommend this step on OSX
- Open terminal
- Type `npm install -g node-inspector bower gulp`

## Installing Node.js and Bower Packages
- Open terminal & navigate to project directory
- Type `npm install`

## Installing Bower Packages
`npm install` will install these too, but you can do it manually after updating bower.json.
- Open terminal & navigate to project directory
- Type `bower install`

## Development
- Develop your angular front-end application in src/app/.. directory
- For transation use the src/i18n/.. directory
- for js files use the src/scripts/.. directory
- for css use the src/styles/.. directory
- for storing libraries use src/lib/..
- include your newly added bower dependency and libraries on karma.conf.js

## Running on local
- Open terminal & navigate to project directory
- Type `gulp serve`

## Building for deployment
- Open terminal & navigate to project directory
- Type `gulp build`

The optimizations are performed by the gulp tasks and include the following list. See the `gulpfile.js` for details

- eslint
- preparing Angular's templatecache for html templates
- concat task to bundle css and js, separately
- Angular dependency injection annotations using ngAnnotate
- uglify to minify and mangle javascript
- source maps
- css autoprefixer for vendor prefixes
- minify css
- optimize images
- index.html injection for scripts and links
- deploying all js, css, images, fonts, and index.html

## Testing
Type `gulp test` to run the tests including both unit and midway tests (spins up a server). This will create a watch on the files, with a 5 second delay, to run the tests.

Testing uses karma, mocha, chai, sinon, ngMidwayTester libraries.
