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
4. (Optional) **package.json > script > start**
- **-p 80** 
(run on port 80)

- **-nextBuildPath '../some-next-build-application'**
(Ie you would have ../some-next-build-application/.next)

- **-NODE_ENV production**
(build in production mode)

Visit http://localhost:80

It will serve the content from *some-next-build-application*.
