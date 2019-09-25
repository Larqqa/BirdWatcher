# BirdWatcher

## What is it?
BirdWatcher is an application that allows users to save bird watching observations. This is done by filling out a form with the following fields:
* Name
* Rarity
* Notes
* Location
* Picture

These entries can then be sorted by date, rarity, and name. Users can also update and delete old entries. The application also works offline, because bird watching is usually done at remote locations. This allows users to save all observations even when their internet isn't working.

## How does it work?
React was used for creating this app. The main app states are handled using Redux. The reducer found in reducers/birdReducer.js also handles database transactions asynchronously with Thunk.

The observation entries are saved to local IndexedDB through the Dexie framework. CRUD requests can be located in services/requests.js. All data is saved and fetched from the local IndexedDB. Images are saved as binary strings.

A service worker is used for offline cache handling, so that the app can be run without internet.

The client is built with webpack. Webpack builds the app into bundle.js and the serviceworker into sw.js. Webpack also copies public files, such as index.html, into the build folder. The client bundles are built into production folder called build and development folder called devBuild. The devBuild folder is only used by Webpack Dev Server.

## Installing & running the app

### Install the app:
```
npm install
```

### Running the development server:
```
npm start
```
The development build is also built before the Webpack Dev Server is started

### Building the production build:
```
npm run build
```

### Serving the production build locally:
```
npm run serve
```
The production build is also built before serving the files

### Running tests:
```
npm test
```
This runs all the tests once

```
npm run test:watch
```
This runs all the tests until stopped. This is useful for developing new tests or features