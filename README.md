# Next-js Server External Build
This repo will run a nextjs server but serve content from anywhere outside this folder.

## Why?
The advantage being that you could place your .next build on an aws s3 bucket and keep your nextjs server independent of your build. 

## How to use?
### 1. Create some-next-build-application
1. npx create-react-app *some-next-build-application*
2. cd *some-next-build-application*
3. Set your next.config.js output to be standalone 
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
 output: 'standalone',
};
export default nextConfig;
```
4. npm run build

### 2. Clone this repo next to the some-next-build-application
1. git clone thisrepo
2. cd thisrepo
3. npm install

### 3. Before running start - Create this variable in your environment 
1. `export nextBuildPath="../*some-next-build-application*"`
2. npm start
3. visit browser at localhost:3000

### 4. (optional) Run pm2
1. `export nextBuildPath="../*some-next-build-application*"`
2. npm run pm2-start
3. visit browser at localhost:3000

---------------------------------------------------------------------------
# Troubleshoot
> Troubleshoot pm2 error: Couldn't find any `pages` or `app` directory. Please create one under the project root 
- pm2 log  
  - check variable: nextBuildPath is not ./ and is your path *some-next-build-application*
- pm2 delete all
- rm -rf error.log out.log
- retry
- for windows:
  `package.json > script > pm2-start: cross-env nextBuildPath='*shared*' node node_modules/pm2/lib/binaries/CLI.js start ecosystem.config.js`

- for linux:
- `export nextBuildPath='*some-next-build-application* && node ./node_modules/.bin/pm2-runtime start ecosystem.config.js`

> Troubleshoot export version
- Check: nextjs-server.js has these properties: dir and conf.dir, both set to: *some-next-build-application*


**Troubleshooting  nextjs-server**
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

---------------------------------------------------------------------------
# Understand Standalone Build under the hood
This isn't technically a standalone build.
There are missing positional files. 
In the Dockerfile included in this repo, those standalone files are copied into the build. 

- `cp *some-next-build-application*/.next myrepo/shared/.next`
- `cp *some-next-build-application*/public myrepo/shared/.next/standalone/public`
- `cp myrepo/sharedfolder.next/static myrepo//shared/.next/standalone/.next/static`

# Disclaimer:
If you are going to share content via a volume to either export or standalone version you will need to restart the Dockerfile 
Steps


# Example Dockerfiles included
- Dockerfiler.standalone
- Dockerfiler.export