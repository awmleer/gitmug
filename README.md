# GitMug

The GitHub app for minimalists.  [HomePage](https://awmleer.github.io/gitmug/index.html)

![homepage screenshot](./screenshots/homepage.png)

## Overview

GitMug is built with [ionic](https://ionicframework.com/) framework (Angular+typescript+cordova), and uses GitHub api v4. Thanks to Angular's aot compilation, the iOS app/Android apk has an incredible small size (about 3~5M), while offering quite a few features.

 Feel free to open issues if you find any bug or have any idea about GitMug.

## Develop

Preparation:

```bash
$ sudo npm install -g ionic cordova
$ cd GitMug
$ npm install
```

Start dev:

```bash
$ ionic serve
```

Build:

```bash
# iOS
$ ionic cordova build ios --prod
# Android
$ ionic cordova build android --release --prod
$ ./signApk.sh
```

IMPORTANT:

If you change the html template, you may need to stop&restart to see the update. (This may be caused by page class inheritance, eg. UserPage & RepoListPage)


## Commit Notation

- [+] add
- [-] remove
- [=] update
- [$] init
- [#] document
- [^] improve
- [~] refactor
- [!] fix
- [*] try
