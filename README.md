# [DEMO LINK](https://anna-Shapovalova.github.io/planets_spa)

Web catalog of Star Wars Planets, using the data provided by [The Star Wars API](https://swapi.dev/), it is a [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) application. The components are styled using [Tailwind CSS](https://tailwindcss.com/).

You can visit a live version of the application [here](https://anna-Shapovalova.github.io/planets_spa).

The app consists of 1 main page:

It renders in the root route /; it shows the main list of planets. You can choose the count of planets displayed on the screen by selecting the required number (5, 10 or 15) in the "select" field.
The planet details page renders in the /planet/[id] route (where id is the ID of the planet); it shows the planet information. It also performs new requests to retrieve related films and residents of the planet.
The residents are actually the links to the people's pages that contain information about them and a link to their "homeworld".

You can always return to the home page by clicking the logo or text in the header or footer.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
