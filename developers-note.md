# listed-client

# Frameworks and Tools

Node.js - v18.16.0

React Native with Expo

Native Base - component library

# Folder Structure

src folder structure

├───assets
│   ├───fonts
│   └───images
├───components (custom components based from native base)
├───layout (screen containers)
├───screens (pages)
│   ├───barcode (module pages)
│   ├───home
│   └───…modules
├───theme (themes and styles)
└───types

*additional folders will follow as the need arise

# Naming Conventions

Files and ComponentNames - (PascalCase)

variableType and objectInstances - (camelCase)

folders - (lower-case)

# Github

organization: listed

repositories:

listed-api
listed-client

# Reminders

- do not 'git push' directly to main
- create a branch for every module you are developing
e.g. module-login, module-registration, module-add-product
- theming and other general configuration changes should be pushed to “theme-config-branch”
- if your branch is done and is ready to merge to main, open a Pull Request, request lead as reviewer (or other members)
- commit message convention: verb + noun
e.g. "add user authentication", "fix login bug"
- do not commit broken code
- use Prettier VS Code Extension for auto-formatting code for proper spacing and indentions