# NgxDhis2ShellBoilerplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0-rc.3.

# NG DHIS2 boilerplate

Boilerplate codes to fast track developing DHIS2 applications based on Angular framework

## Prerequisites

1. [NodeJs (16 or higher)](https://nodejs.org)
2. git, can be installed by running `apt install git`

## Setup

Clone repository

```bash
 git clone https://github.com/udsm-dhis2-lab/ng-dhis2-boilerplate.git <your-app-name>
```

Navigate to application root folder

```bash
cd <your-app-name>
```

Install all required dependencies for the app

```bash
npm install --legacy-peer-deps
```

**NOTE**: Since you are using this boilerplate to start your new app, it is recommended that you find and replace every occurance of `ng-dhis2-boilerplate` with the name of your intended app. Also provide better description of your app in `manifest.webapp`

## Development server

To start development server

```bash
npm start
```

Navigate to [http://localhost:4200](http://localhost:4200).

This command will require proxy-config.json file available in the root of your source code, usually this file has this format

```json
{
  "/api": {
    "target": "https://play.dhis2.org/40.2.1",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  },
  "/dhis-web-commons": {
    "target": "https://play.dhis2.org/40.2.1",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  },
  "/icons": {
    "target": "https://play.dhis2.org/40.2.1",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  }
}
```

We have provided `proxy-config.example.json` file as an example, make a copy and rename to `proxy-config.json`

## Build

To build the project run

```bash
npm run build
```

The build artifacts will be stored in the `dist/`, this will include a zip file ready for deploying to any DHIS2 instance..

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
