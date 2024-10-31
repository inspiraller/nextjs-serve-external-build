# Next-js Server External Build
This repo will run a nextjs server but serve content from anywhere outside this folder.

## Why?
The advantage being that you could place your .next build on an aws s3 bucket and keep your nextjs server independent of your build. 

## How to use?
### 1. Create some-next-build-application
1. npx create-react-app *some-next-build-application*
2. cd *some-next-build-application*
3. npm build

### 2. Clone this repo next to the some-next-build-application
1. git clone thisrepo
2. cd thisrepo
3. npm install

### 3. Before running start - edit cross-env variable - nextBuildPath to your repo
1. Edit package.json script: "start" toyour nextBuildPath repo
"cross-env  nextBuildPath='*some-next-build-application*' node next-server ",
2. npm start
3. visit browser at localhost:3000


### 4. (optional) Run pm2
1. Edit ecosystem-config.js 
```json 
{
  "env_production": {
    "nextBuildPath": "some-next-build-application"
  }
}
```
2. npm run pm2-start
3. visit browser at localhost:3000


> Troubleshoot error: Couldn't find any `pages` or `app` directory. Please create one under the project root 
- pm2 log  
  - check variable: nextBuildPath is not ./ and is your path *some-next-build-application*
- pm2 delete all
- retry
- Check: nextjs-server.js has these properties: dir and conf.dir, both set to: *some-next-build-application*
```js
const app = next({
  dev: NODE_ENV !== "production",
  dir: nextBuildPath,
  conf: { distDir: nextBuildPath },
});
```
> WARNING: 
nextBuildPath is a custom variable that does not work when adding to ecosystem-config.js
you have to export this as an environment variable for it pass into next-server.js

--------------------
# Standalone build option
This isn't technically a standalone build.
There are missing positional files. 
You are going to have to reposition these files to fix the relative static paths and folders.

## Steps:
1. Do a build from *some-next-build-application* with 
**next.config.mjs**
```json
 {"output": "standalone"}
```

First you will need to create temporary folder relative to this repo
- `mkdir shared`

You still have to copy these files
- `cp *some-next-build-application*/.next myrepo/shared/.next`
- `cp *some-next-build-application*/public myrepo/shared/.next/standalone/public`
- `cp myrepo/sharedfolder.next/static myrepo/shared/.next/standalone/.next/static`

3. **ecosystem.config.js**
```json
 {
   "script": "shared/.next/standalone/server.js"
 }
```
4. 
- for windows:
`cross-env nextBuildPath='*shared*' node node_modules/pm2/lib/binaries/CLI.js start ecosystem.config.js`

- for linux:
- `export nextBuildPath='*some-next-build-application* && ./node_modules/.bin/pm2-runtime start ecosystem.config.js`

# Disclaimer:
It's worth noting, that because you are going to run pm2 in a production environment, even if you copy files from s3 to this location, either via export mode or standalone mode, you may need to restart the server for it to pickup the changes.
Steps
1. copy all relative files into a new shared folder: shared.v2/ for argument sake
1. pm2 stop all
2. rm -rf *shared*
3. rm -rf error.log out.log
4. restart script above but target shared.v2/