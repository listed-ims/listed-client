# listed-client

# Frameworks and Tools

- Node.js - v18.16.0
- React Native with Expo
- Native Base - component library

# Folder Structure

src folder structure

├───assets<br/>
│ ├───fonts<br/>
│ └───images<br/>
├───components (custom components based from native base)<br/>
├───layout (screen containers)<br/>
├───screens (pages)<br/>
│ ├───barcode (module pages)<br/>
│ ├───home<br/>
│ └───…modules<br/>
├───styles (themes and styles)<br/>
└───types

_additional folders will follow as the need arise_

# Naming Conventions

- Files, ComponentNames and Types - (PascalCase)
- variables and objectInstances - (camelCase)
- folders - kebab_case
- _use double quotes for JSX attributes and do not enclose string literals in curly braces_

# Github

- organization: listed

- repositories:
  - listed-api
  - listed-client

# Reminders

- do not 'git push' directly to main
- create a branch for every module you are developing
  e.g. module-login, module-registration, module-add-product
- before merge/pull requests, please remove unused imports
- theming and other general configuration changes should be pushed to “theme-config-branch”
- if your branch is done and is ready to merge to main, open a Pull Request, request lead as reviewer (or other members)
- commit message convention: verb + noun
  e.g. "add user authentication", "fix login bug"
- do not commit broken code
- use Prettier VS Code Extension for auto-formatting code for proper spacing and indentions
