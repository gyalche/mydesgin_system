# Receptionist Design System

This Design System is to be used in most Receptionist Apps, it’s made using storybook.

### To start the sorybook
```
npm run storybook
```
---
## To make the package available locally
If you made changes to the Design system and you want to test it locally on another app without publishing the npm package, this section will explain how to do so.

1. make sure the **npm package** is uninstalled
```
npm uninstall @receptionist/designsystem
```
2. Inside the **Receptionist Design System folder** do this:
```
npm link
```
3. When successful go into the folder of the **Project** that will use the package
```
npm link @receptionist/designsystem
```
4. After Testing the changes do the following in the **Project folder**
```
npm unlink @receptionist/designsystem
```
5. After Testing the changes do the following in the **Receptionist Design System folder**
```
npm unlink 
```
6. Reinstall the npm package
```
npm i
```