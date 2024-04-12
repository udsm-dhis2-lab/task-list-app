# Task List App

## Background

In the realm of routine health data management, users are tasked with collecting, validating, and analyzing data within specific time intervals to meet domain requirements. These responsibilities must be efficiently coordinated to ensure timely and high-quality data. In most DHIS2 implementations, facility-level users enter data on a regular basis, while district-level users ensure that data is collected and reported on time and accurately. Higher-level users (i.e at Regional and National levels) concentrate on data analysis, visualization and use and occasionally perform data quality assessments.

However, handling tasks across many DHIS2 modules can be time-consuming and potentially ineffective. To address this issue, a solution is proposed: a task list application that consolidates users' routine system/data related tasks onto a single screen. This application functions as a consolidated center for tracking tasks, reducing the need to browse through many sections. It can also be used as an entry point for users, presenting their duties and allowing for effective task management.

In a typical DHIS2 system, data entrants are presented with tasks for filling assigned datasets based on the dataset's period type. Timelines, deadlines, and task priorities are determined by dataset configurations. Data reviewers, often district users, review data entries and may require corrections

The task list application facilitates this review process, displaying tasks for review and validation by district users, who can accept tasks or return them for modification. Higher-level users use the task list application to conduct data quality reviews and assessments.

## Prerequisites

Make sure your environment has the following

> 1. [NodeJs (16 or higher)](https://nodejs.org)
> 2. [Angular CLI v17 or higher](https://github.com/angular/angular-cli)
> 3. [git](https://git-scm.com/downloads)

## Installation

1. Clone the repository from Git

```bash
git clone https://github.com/udsm-dhis2-lab/task-list-app.git
```

2. Navigate to application root folder

```bash
cd task-list-app
```

3. Install all required dependencies for the app.

```bash
npm install
```

OR

```bash
yarn install
```

## Development server

Execute the following command to run the application.

```bash
npm start
```

OR

```bash
yarn start
```

Navigate to [http://localhost:4200](http://localhost:4200).

> **NOTE**: This command will require proxy-config.json file available in the root of your source code, usually this file has this format.

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": "false",
    "auth": "username:password",
    "changeOrigin": true
  },
  "/": {
    "target": "http://localhost:8080",
    "secure": "false",
    "auth": "username:password",
    "changeOrigin": true
  }
}
```

We have provided `proxy-config.example.json` file as an example, make a copy and rename to `proxy-config.json`

## Build

To build the application, run

```bash
npm run build
```

OR

```bash
yarn build
```

The build artifacts will be stored in the dist/, this will include a zip file ready for deploying to any DHIS2 instance..

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
