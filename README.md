# RADx® Data Hub

The [NIH Rapid Acceleration of Diagnostics Data Hub (RADx Data Hub)](https://radxdatahub.nih.gov/) is a secure, cloud-based platform accelerating innovation in public health by enabling data sharing, exploration, and analysis. By providing analytic tools and access to de-identified data from [RADx Initiative programs](https://www.nih.gov/research-training/medical-research-initiatives/radx/radx-programs), the Data Hub supports data-driven insights and cross-sector collaboration. Researchers can discover studies, access curated and harmonized data, and use integrated tools to analyze data in new ways, informing public health strategies and strengthening health system preparedness.

### Features

-   **Study Explorer:** Contains a number of discovery features (e.g. search, sorting, filtering) to help a user quickly and easily find studies and/or variables.
-   **Study Overview Pages:** Each study in the system has an overview page, which contains key documents, metadata, and variable and file information.
-   **Variable Overview Pages:** Each harmonized variable in the system has an overview page, which contains metadata, mappings, and a list of studies containing the variable.
-   **User Registration & Authentication:** To gain access to specific features, a user can use their Researcher Auth Service (RAS) Identity Provider (IdP) account to register with the RADx Data Hub.
-   **Approved Data:** Authenticated users can access data files based on their Database of Genotypes and Phenotypes (dbGaP) approvals.
-   **Analytics Workbench:** Users can launch instances with Jupyter notebooks, using Python or R, in a personal workspace environment.
-   Other features include **Data Submission**, **Data Curation**, **Study Registration**, **Metrics** , and **User Management**.

## Getting Started

-   [Next.js](https://nextjs.org/): v14.2.3
-   [React](https://react.dev/): v18.2.0
-   [Node.js](https://nodejs.org/en): v20.17.0
-   [NPM](https://www.npmjs.com/): v10.8.2

This project is built using **React** for building dynamic user interfaces and **Next.js** for server-side rendering, routing, and optimized performance. Early components were developed within [Storybook](https://storybook.js.org/docs/react/get-started/install/), a UI sandbox where components can be isolated, making it easier to build, document, and visually test components outside of the main application. For more information, [see below](#storybook).

Component pre-builts are wired from [React-Bootstrap](https://react-bootstrap.github.io/) bases. Major libraries used:

-   [Tanstack table](https://tanstack.com/table/v8) - Used in combination with React to efficiently build and manage data tables. It provides powerful features like column sorting, filtering, and global search to enhance user interaction and data handling.
-   [React-Hook-Form](https://react-hook-form.com/) - Used to handle forms in our application, making it easier to handle user input, validation, and form submissions. Its hook-based approach simplifies form logic and improves performance with minimal re-rendering.
-   [Redux](https://react-redux.js.org/): Used to manage global app state, such as toast messages, user profiles, and user sessions. This ensures consistent data access and behavior across different parts of the application.
-   [cedar-embeddable-editor](https://github.com/metadatacenter/cedar-embeddable-editor) - Used to view metadata files in a human-readable format, accessed on Study Overview pages
-   [data-dictionary-viewer](https://github.com/bmir-radx/data-dictionary-viewer-component) - Used to view data dictionary files in a human-readable format, accessed on Study Overview pages

## Set up Local Environment

### To Run locally

1. Clone the repository
2. Go into the folder: `cd UI`
3. Install packages: `npm install`
4. Create .env file ([see below](#create-env-file))
5. Run build (generates .next/): `npm run build`
6. Run the UI: `npm run dev`
7. Open [http://localhost:3000](http://localhost:3000) in your browser

#### Create .env file

1. In the project's root directory, create an `.env` file
2. Include the following variables:
    - `NEXT_PUBLIC_DEV_URL`: link to DEV env. Used as the base for all API calls
    - `RAS_URL`: URL provided by RAS team
    - `NODE_TLS_REJECT_UNAUTHORIZED`: set to 0, only used for our local env
    - `NEXT_PUBLIC_GTAG`: Tag for Google Analytics
3. Rerun application if any changes were made to this file

## Overview

### Project Folder Structure

-   `/components`: Houses all the components used throughout the application. A component will have its main .jsx file, SCSS file (this project uses SASS and CSS modules for styling), and Storybook file.
-   `/components/CoreLayout`: The base layout - each page is a child of this component. Includes header, footer, navbar, idle timer/session modal, user instantiation, and toast notification container.
-   `/components/Images/svg`: Contains all the svg icons used throughout the application
-   `/constants/apiRoutes`: Paths for API calls to backend servers and public API calls with Next.js
-   `/lib`: Contains hooks, helper functions, utils, etc.
-   `/middleware`: Middleware to handle CORS
-   `/pages`: This application uses NextJS page routing, allowing easy creation of routes by adding files to this directory. It uses server-side props to fetch data and render a view at request time
-   `/pages/api/launch`: In Next.js, the `pages/api` folder is used to create API routes, enabling the development of backend endpoints directly within the application. Each file in `/pages/api/launch` functions as a serverless function capable of handling requests after page load.
-   `/pages/postAuth`: When a user logs in with RAS, they are directed back to the application via this url path
-   `/public/images`: Houses public images throughout the application such as banners, homepage photos, etc.
-   `/store`: Redux store used to set user's token and send toast notifications
-   `/styles`: This application uses SASS and CSS modules for styling. This folder holds global styling and variables for all components to reference.
-   `/views`: Each folder will contain a page view and SCSS file. It may contain additional helper functions, constants, and components specific to the view.

### User Authentication

Authentication is required to access specific features. RADx Data Hub uses National Institutes of Health (NIH) [Researcher Auth Service (RAS)](https://datascience.nih.gov/researcher-auth-service-initiative) Identity Provider (IdP) as user authenication into the application. When a user logs in via RAS, they are directed to `/postAuth` with a session ID that is used to retrive user information from the backend servers.

#### Login Locally

1. Ensure that a RAS account has been created, specifically an [NIH Login](https://secure.login.gov/) or [eRA Commons](https://www.era.nih.gov/register-accounts/create-and-edit-an-account.htm) account.
2. Sign into a DEV environment.
3. Inspect the page and note the Cookie `chocolateChip` value.
4. For your local environment, there are 2 ways to use the DEV's session:
    - Append the `chocolateChip` value to the end of localhost's postAuth URL (http://localhost:3000/postAuth?sessionID=XXXXXXXXXXXX) to simulate a user's login redirect.
    - Recreate the `chocolateChip` on the local browser and refresh the page.

#### User Roles

By default, all authenticated users are granted access to the **Data Access** navigation item, which includes links to the **Public Data** and **My Approved Data** pages. Additional roles associated with data submission, curation, support, and/or reporting are available and can be assigned through **User Management**.

#### Idle Timer/Session Modal

For security, a user's interaction with the application is tracked. If a user is idle for a specified amount of time, a session modal will appear with a 5 minute countdown. If the user clicks "I'm Here", their token is refreshed. If not, the user is automatically logged out of the system.

### Jest Tests

It is currently a future task to add more tests to the application. The configuration is set up in `jest.config.js` and `babel.config.testing.js`. Preliminary tests were written for the homepage in `/views/Homepage/Tests`.

### Storybook

Early components were first developed within [Storybook](https://storybook.js.org/docs/react/get-started/install/). These were common components and variants to assist in the early development and visualization of the project.

Storybook files can be found in a component's directory:

```
componentA/
├── componentA.jsx
├── componentA.module.scss
└── componentA.stories.jsx
```

To run Storybook:
`npm run storybook`

To build the framework for Storybook:
`npm run build-storybook`

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

Run all of the unit tests with Jest:

`npm run test`
