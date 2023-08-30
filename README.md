# listed-client

## Description

This repository contains the source code for the Listed Inventory Management System client application.

## Frameworks and Tools

- Node.js - v18.16.0
- React Native v0.72 with Expo v49
- Native Base - component library

## Folder Structure

- everything is inside the src directory
- since we are using expo router for our navigation, we will be putting our screens inside the app directory following a file-based routing structure
- we will be using the following folder structure for our components
- components are divided into 3 categories: atoms, molecules, and organisms

```
src
 ┣ app
 ┃ ┣ (home)
 ┃ ┃ ┣ account
 ┃ ┃ ┣ notifications
 ┃ ┃ ┣ stores
 ┃ ┃ ┣ index.tsx
 ┃ ┃ ┗ _layout.tsx
 ┃ ┣ auth
 ┃ ┣ products
 ┃ ┗ _layout.tsx
 ┣ assets
 ┣ components
 ┃ ┣ atoms
 ┃ ┃ ┣ Buttons, Input fields,Labels,Icons,Typography components, Spinner/loading indicators
 ┃ ┣ molecules
 ┃ ┃ ┣ Form controls,Search bar,Checkbox with label, Radio button group,Cards,Dropdown
 ┃ ┣ organisms
 ┃ ┃ ┣ Header (logo, navigation, search),Sidebar,Product listing (multiple cards), Subpages
 ┃ ┗ index.ts
 ┣ constants
 ┣ context
 ┣ services
 ┣ styles
 ┣ types
 ┗ utils
```

## Conventions

### File Naming

- folders/directories - kebab-case
- screens/layouts (`index.tsx`, `login.tsx`, `_layout.tsx`) - kebab-case
- ComponentFiles (.tsx) - PascalCase
- otherFiles (utils.ts) - camelCase

### Inside Files

- variables and objectInstances - camelCase
- ComponentNames - PascalCase
- functionNames - camelCase
- Use react arrow function components (`rnfe` snippet if you have ES7+ React/Redux/React-Native/JS snippets extension installed)
- _use double quotes for JSX/TSX attributes and do not enclose string literals in curly braces_

## Contributions

We encourage contributors to follow the suggested GitHub workflow when contributing to this repository. Make sure to:

1. Create a new branch for your feat/fix/misc.
2. Commit your changes with descriptive messages.
3. Push your changes to your branch.
4. Submit a pull request to the repository's main branch.

## Getting Started

1. Clone the repository to your local. Make sure you have the correct version of Node.js installed and ExpoGo on your mobile device or simulator.
2. Run `npm install` to install the project dependencies.
3. Run `npm start` to start the Expo server.
4. If you encountered an error in step 3 after several tries, run `npx expo start --tunnel` instead.
5. Scan the QR code using your mobile device or simulator to run the app.
6. Make sure to run the Listed API server locally as well.
7. You can now start developing! 🎉
