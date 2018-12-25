# Solenya ASP.NET Core Starter Project

It's set up to use Webpack 4 & Bootstrap w/ sass files.

## Setup Tips

Here's some setup tips, which have nothing to do with `solenya` itself, but which you may find useful:

 * Bootstrap 4 uses sass files, which unfortunately means that you'll need the `node-sass` package, that requires manual configuration:
   * To configure your machine:
     * `npm install --global --production windows-build-tools`
     * `npm install --global node-gyp`
     * `setx PYTHON %USERPROFILE%\.windows-build-tools\python27\python.exe`
   * Then, when building and running your project, should `node-sass` fail:
     * From the Package Manager Console, run the the following command: `npm rebuild node-sass --force`
     * Rebuild and run your project
* Occassionally, you'll ned to wipe the node_modules directory, where all the client libraries are installed. Install the `rimraf` tool to wipe it.
 * The project is setup to use https locally. To make this work on your machine, you need to go to the project properties, uncheck SSL, save the project, and then go back into the project properties and re-check SSL. Visual Studio will automatically (lol) setup a new port for you.

## Code To Play With

There's plenty of code samples here: https://stackblitz.com/@solenya-group. In particular, `solenya-samples` has many common small uses cases.

 You may also want to load some additional solenya packages to your packages.json, such as `solenya-animation`, `solenya-autocomplete`, and `solenya-tables`.

 ## Debugging

 Solenya libraries ship with sourcemaps, so you can step into the library code when debugging. The webpack.config.js has been setup to make sure the sourcemaps work.

 ## Releasing

 The Startup.cs and webpack.config.js files have been setup to minify your javascript code in release mode.

 ## Hot Module Reloading

This dynamically reloads your client code as you make changes to it, without having to refresh your browser.

It's on for debug mode and off for release mode.