# RADx® Data Hub

The [NIH Rapid Acceleration of Diagnostics Data Hub (RADx Data Hub)](https://radxdatahub.nih.gov/) is a centralized data repository that provides access to analytic tools and de-identified COVID-19 data from the RADx Initiative. The RADx Data Hub supports scientific efforts to better understand COVID-19 and factors associated with disparities in morbidity and mortality in underserved and vulnerable populations, by allowing researchers to discover, access, and perform analyses of COVID-19 datasets in a cloud-enabled platform.

### Features

-   **Study Explorer:** Contains a number of discovery features (e.g. search, advanced search, sorting, filtering) to help a user quickly and easily find studies.
-   **Study Overview Pages:** Each study in the system has an overview page, which contains key documents, metadata, and variable and file information.
-   **Variables Catalog:** This tabular resource lists all variables in each data file for each study.
-   **Support Request:** A user has multiple ways to submit a support request, so they can ask questions, report bugs, and request in-depth assistance from the Support team on complex questions. The Support team can then monitor, track, and address the requests.
-   **User Registration & Authentication:** To gain access to specific features, a user can use their Researcher Auth Service (RAS) Identity Provider (IdP) account to register with the RADx Data Hub.
-   **Approved Data:** Users can access data files based on their Database of Genotypes and Phenotypes (dbGaP) approvals.
-   **Analytics Workbench:** Users can launch instances with Jupyter notebooks, using Python or R, in a personal workspace environment.
-   Additional features include **Study Registration**, **Data Submission and Curation**, **Metrics**, and **User Management**.

## Getting Started

-   [Next.js](https://nextjs.org/): v14.2.3
-   [React](https://react.dev/): v18.2.0
-   [Node.js](https://nodejs.org/en): v18.12.1
-   [NPM](https://www.npmjs.com/): v9.4.2

Components and pages are first developed within [Storybook](https://storybook.js.org/docs/react/get-started/install/), a UI sandbox where we can isolate the components in. Component pre-builts are wired from [React-Bootstrap](https://react-bootstrap.github.io/) bases. We also use [Tanstack table](https://tanstack.com/table/v8), [React Querybuilder](https://react-querybuilder.js.org/docs/intro), [React-Hook-Form](https://react-hook-form.com/), and [cedar-embeddable-editor](https://github.com/metadatacenter/cedar-embeddable-editor) in this project. For code uniformity, we use [ESLint](https://eslint.org/).

## Set up Local Environment

#### To Run locally

1. Clone the repository
2. Install packages: `npm install`
3. Run build (generates .next/): `npm run build`
4. Run the UI: `npm run dev`

#### Create .env file

1. In the project's root directory, create an `.env` file
2. Include the following variables:
    - `DEV_URL`: link to DEV env. Used as the base for all API calls
    - `EXT_DEV_URL`: external link to DEV env
    - `RAS_URL`: URL provided by RAS team
    - `NODE_TLS_REJECT_UNAUTHORIZED`: set to 0, only used for our local env
    - `NEXT_PUBLIC_GTAG`: Tag for Google Analytics
3. Rerun application if any changes were made to this file

## Overview

### Structure

-   `/components`: Houses all the components used throughout the application. A component will have its main .jsx file, SCSS file (this project uses SASS and CSS modules for styling), and Storybook file.
-   `/components/CoreLayout`: The base layout - each page is a child of this component. Includes header, footer, navbar, idle timer/session modal, user instantiation, and toast notification container.
-   `/components/Images/svg`: Contains all the svg icons used throughout the application
-   `/constants/apiRoutes`: Paths for API calls to backend servers and public API calls with Next.js
-   `/lib`: Contains hooks, helper functions, utils, etc.
-   `/middleware`: Middleware to handle CORS
-   `/pages`: Next.js page routing. Uses server-side props to fetch data and render a view at request time
-   `/pages/api/launch`: "/pages/api" is a Next.js specific convention. Any files within this folder are treated as an API endpoint. For this project, it's mainly used to house and make API calls after page load
-   `/pages/postAuth`: When a user logs in from RAS, they are directed back to the application via this url path
-   `/public/images`: Houses public images throughout the application such as banners, homepage photos, etc.
-   `/store`: Redux store used to set user's token and send toast notifications
-   `/styles`: This application uses SASS and CSS modules for styling. This folder holds global styling and variables for all components to reference.
-   `/views`: Each folder will contain a page view and SCSS file. It may contain additional helper functions, constants, and components specific to the view.

### User Authentication

RADx Data Hub uses National Institutes of Health (NIH) Researcher Auth Service (RAS) as user authenication into the application. When a user logs in via RAS, they are directed to `/postAuth` with a session ID that is used to get user information from the backend.

#### Login Locally

To login locally, create a Login.gov account and sign into a DEV environment. Inspect the page and look at the Cookie chocolateChip value. Append it to the end of localhost's postAuth URL (`http://localhost:3000/postAuth?sessionID=XXXXXXXXXXXX`) to simulate a user's login redirect. Or recreate the chocolateChip value on your local browser and refresh the page.

#### Idle Timer/Session Modal

For security, a user's interaction with the application is tracked. If a user is idle for a specified amount of time, a session modal will appear with a 5 minute countdown. If the user clicks "I'm Here", their token is refreshed. If not, the user is automatically logged out of the system.

### Jest Tests

It is currently a future task to add more tests to the application. The configuration is set up in `jest.config.js` and `babel.config.testing.js`. Preliminary tests were written for the homepage in `/views/Homepage/Tests`.

## Other Commands & Scripts

#### Node commands

    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "export": "next export",
        "storybook": "storybook dev -p 6006",
        "build-storybook": "storybook build",
        "test": "jest"
    },

#### Script Descriptions

Run the UI developer:

`npm run dev`

Build the framework for the repo:

`npm run build`

Start the server:

`npm run start`

Run ESLint for the whole repo (VSCode should already do this automatically):

`npm run lint`

Use quick fix for all ESLint issues:

`npm run lint-fix`

Run the Next export command:

`npm run export`

Run a development server for Storybook:

`npm run storybook`

Build the framework for Storybook:

`npm run build-storybook`

Run all of the unit tests with Jest:

`npm run test`
