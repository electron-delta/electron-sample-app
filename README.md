## Electron sample app

A complete example of an auto-updating app demonstrating the delta updates. The app is built using [electron-builder](https://github.com/electron-userland/electron-builder) and
[@electron-delta/builder](https://github.com/electron-delta/electron-delta)

Delta auto updates are handled by [@electron-delta/updater](https://github.com/electron-delta/electron-delta-updater)


![Delta updates](https://electrondelta.com/assets/delta-downloading.png)


## Installation

```bash
git clone git@github.com:electron-delta/electron-sample-app.git
cd electron-sample-app
npm install

```

## Testing delta releases
Let's create the first version of the app.
1. Open the `src/main.js` and set the hostURL to `http://localhost:5000/`
2. Open .electron-delta.js and use the following `getPreviousReleases` method

```js
const getPreviousReleases = async () => {
  return [];
};
```
3. Change the `version` to `1.0.0` and create the distribution files.
```bash
npm version 1.0.0
npm run dist

```

4. Now serve the dist files over port 5000.
```bash
npx serve -s dist -p 5000
```

5. Open .electron-delta.js and use the following `getPreviousReleases` method
```js
const getPreviousReleases = async () => {
  return [
    {
      version: '1.0.0',
      url: 'http://localhost:5000/electron-sample-app-1.0.0.exe',
    }
  ];
};
```

6. Change the `version` to `1.0.1` and create the distribution files.

```bash
npm version 1.0.1
npm run dist
```

7. Notice that a new folder is created under `/dist/1.0.1-delta-installers`. Move all those files to `/dist/`. Make this url `http://localhost:5000/delta.json` is working.

8. Now install the `electron-sample-app-1.0.0.exe` app. Your app should be auto updated to 1.0.1 using delta updates.



