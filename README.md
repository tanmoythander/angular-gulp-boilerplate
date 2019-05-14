# Angular Gulp Boilerplate

#### Quickly start your angularJS project, develope with flexibility using dev command line tools and build a deploy version with source minification.


## Installing on local machine


### Please make sure you have node.js installed on your machine
If you don't have, [click here](https://nodejs.org/)


#### 1. Check if you have it installed or not,
```
npm -v
```
and,
```
node -v
```
you should see some version info in return.

#### 2. Install global packages
run on any directory,
```
npm install -g gulp-cli node-gyp
```
in case of mac or linux, you might need to mention "sudo"


#### 3. Now go to the directory where you want to place the project files using git bash
(terminal for mac or linux)
run the command,
```
git clone URL
```
here URL is the http url you get from the repository page, [Click here to clone](https://github.com/tanmoythander/angular-gulp-boilerplate)

#### 4. now navigate to the project directory with cmd (terminal for mac or linux)</b><br>
run the command,
```
npm install
```
wait for it to be completed. It usually takes 5-10 minutes to complete.
It will download all the dependencies, build the project and serve the build on browser.

## Using the gulp commands


#### 1. Serve the source
File watching enabled (Development Mode)
```
gulp
```
You should see the browser window opening address http://localhost:3000 (opens another port if unavailable).


If you want to serve the source without watching file changes (Source Testing Mode),
run this,
```
gulp serveSource
```


#### 2. Build the source
Build the source code into ./_build (Deployment Mode)
```
gulp build
```
Warning: It will delete previous build !!!


#### 3. Serve the build
Serve the ./_build/ without watching file changes (Build Testing Mode)

```
gulp serveBuild
```
you should see the browser window opening address http://localhost:3000 (opens another port if unavailable).

Warning: It will delete previous build !!!


## Developer Hint

Please change your editor configuration like below before you start development

#### Indent character: "\t" (tab)

#### Indent size: 2

#### Line endings: LF (unix)



See the live demo [here](https://tanmoythander.info/angular)
