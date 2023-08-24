# listed-client

## Description

This repository contains the source code for the Listed Inventory Management System client application.

## Frameworks and Tools

- Node.js - v18.16.0
- React Native v0.72 with Expo v49
- Native Base - component library

## Folder Structure

```
src
├── assets
├── components
│   └── Button.tsx
├── constants
│   └── api.ts
├── context
│   └── AuthProvider.tsx
├── layout
│   └── ScreenContainer.tsx
├── navigation
│   └── TransactionsNavigation.tsx
├── screens
├── services
│   └── UserService.ts
├── styles
│   └── theme.ts
├── types
│   └── user.ts
├── styles
│   └── theme.ts
└── utils
    └── utilFunction.ts
```

## Conventions

- folders - kebab-case
- Component files and functions (.tsx) - PascalCase
- otherFiles (.ts) - camelCase
- variables and objectInstances - camelCase
- Use react functional components (`rafce` snippet if you have ES7+ React/Redux/React-Native/JS snippets extension installed)
- _use double quotes for JSX attributes and do not enclose string literals in curly braces_

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
