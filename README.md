# CODE QUALITY EXAMPLE

### Steps to reproduce:

1. Create folder `mkdir code-quality`
2. Enter folder `cd code-quality`
3. Initialize npm package `npm init`
   Example output:

```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (code-quality)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository: https://github.com/angelinabylitskaya/code-quality.git
keywords:
author: angelinabylitskaya
license: (ISC)
About to write to /Users/angelinabylitskaya/Documents/GitHub/code-quality/package.json:

{
  "name": "code-quality",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/angelinabylitskaya/code-quality.git"
  },
  "author": "angelinabylitskaya",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/angelinabylitskaya/code-quality/issues"
  },
  "homepage": "https://github.com/angelinabylitskaya/code-quality#readme"
}

```

4. Create .gitignore `touch .gitignore`
   **.gitignore**

```
node_modules
```

5. Install Prettier `npm install --save-dev --save-exact prettier`
   5.1. Add **.prettierrc** file `touch .prettierrc`

```diff
+{
+    "tabWidth": 2,
+    "singleQuote": true,
+    "printWidth": 80
+}
```

5.2. Add **.prettierignore** file `touch .prettierignore`

```diff
+node_modules
```

6. Install ESLint `npm init @eslint/config@latest`
   Example output:

```
Need to install the following packages:
@eslint/create-config@1.3.1
Ok to proceed? (y)
@eslint/create-config: v1.3.1

✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · typescript
✔ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint, eslint-plugin-react
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
☕️Installing...
```

6.1. Install prettier-eslint plugin `npm install --save-dev eslint-config-prettier`
6.2. Add plugin to eslint config
Plugin all ignore eslint style rules that conflicts with prettier
**eslint.config.mjs**

```diff
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
+import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
+  eslintConfigPrettier,
];
```

6.3. (optional) Install HTML lint plugin `npm install --save-dev eslint @html-eslint/parser @html-eslint/eslint-plugin`
6.4. (optional) Configure HTML plugin
**eslint.config.mjs**

```diff
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
+import html from '@html-eslint/eslint-plugin';
+import htmlParser from '@html-eslint/parser';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
+  {
+    ...html.configs['flat/recommended'],
+    files: ['**/*.html'],
+    plugins: {
+      '@html-eslint': html,
+    },
+    languageOptions: {
+      parser: htmlParser,
+    },
+  },
];

```

7. Install list-staged `npm install --save-dev lint-staged`
8. Configure lint-staged `touch .lintstagedrc`
   **.lintstagedrc**

```diff
+{
+    "*.{ts,tsx,html,css,scss}": [
+        "prettier --write",
+        "eslint --fix"
+    ]
+}
```

9. Install Husky for managing git hooks `npm install --save-dev husky`
   9.1. Initialize Husky `npx husky init`
   9.2. Modify **.husky/pre-commit** file

```diff
+npx lint-staged
```

or

```diff
+git rev-parse -q --no-revs --verify MERGE_HEAD && echo "Merge mode - pre-commit skipped" || npx lint-staged
```

to ignore merge commits
9.3. To make sure everyone will install husky properly, add npm hook script
**package.json**

```diff
{
  "name": "code-quality",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1",
-    "prepare": "husky"
+    "prepare": "husky",
+    "postinstall": "npm run prepare"
  },
  ...
}
```

10. VSCode configuration
    10.1. Install Prettier Extension (id: `esbenp.prettier-vscode`)
    11.2. Install ESLint Extension (id: `dbaeumer.vscode-eslint`)
    11.3. Add both extensions to the recommendations (on installed extension in extensions list click setting -> Add to workspace recommendations)
    **.vscode/extensions.json**

```diff
+{
+  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
+}
```

11.4. Add prettier run on file save (Settings -> workspace -> Editor: Format on save = true)
**.vscode/settings.json**

```diff
+{
+  "editor.formatOnSave": true
+}
```

11.5. Add eslint config
**.vscode/settings.json**

```diff
{
-  "editor.formatOnSave": true
+  "editor.formatOnSave": true,
+  "eslint.enable": true,
+  "eslint.validate": [
+    "javascript",
+    "javascriptreact",
+    "typescript",
+    "typescriptreact",
+    "html"
+  ]
}
```

### Recommendations

#### Different prettier configs for different file extensions

1. Create separate files with corresponding rules:
   - .prettierrc.ts.json
   - .prettierrc.css.json
   - .prettierrc.html.json
2. Update .lintstagedrc:

```diff
{
-    "*.{ts,tsx,html,css,scss}": [
-        "prettier --write",
-        "eslint --fix"
+    "*.{ts,tsx}": [
+        "prettier --write --config ./.prettierrc.ts.json",
+        "eslint --fix"
+    ],
+    "*.{css,scss}": [
+        "prettier --write --config ./.prettierrc.css.json"
+    ],
+    "*.html": [
+        "prettier --write --config ./.prettierrc.html.json",
+        "eslint --fix"
    ]
}
```
