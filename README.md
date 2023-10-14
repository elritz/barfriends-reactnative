# barfriends-reactnative
Discover and explore the best of your local area with our going-out app. Find nearby restaurants, bars, events, and activities to make the most of your time right in your neighborhood. From hidden gems to popular hotspots, we've got you covered for a fun and memorable local experience.

🚀 Welcome to Barfriends!
This project aims to be a strong foundation for react-native applications. It provides a clear and organized structure, core dependencies.

Date : 2023-10-14 16:07:15

Directory /Users/christianfirmi/Desktop/4/Github/bfs/revel

Total : 541 files, 73801 codes, 3440 comments, 7688 blanks, all 84929 lines


| Project Summary	| files	|code	|comment	|blank	|total|
| :--------: | :----------: | :---------: | :--------: | :----: | ------ |
|**TypeScript JSX**| 308 |28,420| 817 |1,982 |31,219|
|**TypeScript** |138| 24,944| 2,448| 3,263 |30,655
|**GraphQL** |1 |17,527 |31| 2,381 |19,939|
|**JSON**| 8 |1,976 |10 |5| 1,991|
|**JavaScript**| 71 |575 |9 |35 |619|
|**JSON with Comments**| 3 |159 |86 |3 |248|
|**XML** |7| 155| 0 |7| 162|
|**YAML**| 3| 36| 39| 11| 86|

Folder structure
This template follows a very simple project structure:

app: This folder is your navigation structure and screens.
reactive: This folder contains all global and specialized state can be stored.
assets: Asset folder to store all images, vectors, etc.
components: Folder to store any common component that you use through your app (such as a generic button)
constants: Folder to store any kind of constant that is in the app.
localization: Folder to store the languages files. Na
graphql: Folder to write and generate react hooks. 
util: Folder that contains logic function and hooks.
types: Folder to put any types.

Setup environments
Using scripts from console The template already has scripts to execute the project calling a specific environment defined into the package.json file. Keep in mind that if you are going to create new envs you have to define the script to build the project properly.

To define which env you want to use, just keep the structure yarn [platform]: [environment]

DEV: yarn ios or yarn android

STG: yarn ios:staging or yarn android:staging

PROD: yarn ios:prod o yarn android:prod
Also, you can use npm following the same rule as before: npm run ios:staging

Modify the environment variables files in root folder (.env.development, .env.production and .env.staging)
