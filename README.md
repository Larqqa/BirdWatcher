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
The observation entries are saved to local IndexedDB through the Dexie framework. CRUD requests are implemented and can be found in file services/requests.js.

The app is a React app with Redux and React Router implemented. The main app states are handled using Redux and the reducer found in reducers/birdReducer.js also handles database transactions. Thunk is used for asyncronous database transactions.

A service worker is used for offline cache handling, so that the app can be run without internet.

The client is built with webpack. Webpack builds the app into bundle.js and the serviceworker into sw.js. Webpack also copies public files, such as index.html, into the build folder.

Webpack bundles the client into production folder called build and development folder called devBuild.

## Installing & running the app

Install the app:
```
npm install
```

Running the dev server:
```
npm start
```

Building the production build:
```
npm run build
```

Serving the production build:
```
npm run serve
```