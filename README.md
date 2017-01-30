
#UnifyPlus Front-end

This project uses best practices and guides with integration of Gulp, Bower, Karma, Mocha with task automation, testing and more.

## Structure
    /build  (created on the fly)
    /gulp
    /src
        /client
            /app
            /content
            /test
        /server
            /data
            /routes

## Prerequisite

- Install Node
    - on OSX install [home brew](http://brew.sh/) and type `brew install node`
    - on Windows install [chocolatey](https://chocolatey.org/) and type `choco install nodejs`
- On OSX you can alleviate the need to run as sudo by [following these instructions](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md). I highly recommend this step on OSX
- Open terminal
- Type `npm install -g node-inspector bower gulp`

## Installing Node.js and Bower Packages
- Open terminal
- Type `npm install`

## Installing Bower Packages
`npm install` will install these too, but you can do it manually.
- Open terminal
- Type `bower install`

## Running
TODO: Add details for this

The optimizations are performed by the gulp tasks and include the following list. See the `gulpfile.js` for details

- jshint
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

### The Modules
This project contains mainly four modules. Admin, Clinician, Partners and Patients. These four modules contains sub-modules and their sub-modules as it contains so many functionality.

```
app --> [
        app.admin,
        app.clinician,
        app.partners,
        app.patients,
        app.core --> [
            ui.router,
            ngResource,
            angularUtils.directives.dirPagination,
            pascalprecht.translate
        ]
    ]
```

## Things to Follow:
    - Use vm instead of $scope
    - Add one component per file. Do not add multiple component in one file.
    - Set code format same as all files.
    - Proper file naming convention
    - 
