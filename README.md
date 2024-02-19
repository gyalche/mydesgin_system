# Receptionist Design System

This Design System is to be used in most Receptionist products, it's a bridge in between development and design teams. And it’s made using thinking in using Storybook so everybody can check it's possibilities.

### Who install the last version
```
npm install -s @d-lighted/receptionist-design-system
```

### To start the storybook from this project
```
npm run storybook:run
```

The Storybook is also available [online](https://storybook.receptionist.jp/).

---
## To make the package available locally
If you made changes to the Design System and you want to test it locally on another app without publishing the npm package, this section will explain how to do so. [[Documentation](https://d-lighted.atlassian.net/wiki/spaces/Engineers/pages/2733047818/development+local+package)]

1. make sure the **npm package** is uninstalled
```
npm uninstall @d-lighted/receptionist-design-system
```
2. Inside the **Receptionist Design System folder** do this:
```
npm link
```
3. When successful go into the folder of the **Project** that will use the package
```
npm link receptionist-design-system
```
4. After Testing the changes do the following in the **Project folder**
```
npm unlink receptionist-design-system
```
5. After Testing the changes do the following in the **Receptionist Design System folder**
```
npm unlink
```
6. Reinstall the npm package
```
npm i
```
