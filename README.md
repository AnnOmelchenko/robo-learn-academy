# RoboLearn Academy

Your Gateway to Robotics Mastery

DEMO: https://

This project was created using such technologies:
- React
- TypeScript
- React router dom
- AVRjs
- Intel hex

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm test`

Runs tests

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## My project is divided into the following layers:

- ### View

- ### Application

- ### Api

### The view layer is divided into:
 
- ### Presentation: This layer accepts data and throws events. It does not have access to the API (Header, Loader, Spinner, LessonDetails, LessonLesson, LessonsListPage, LessonSection, SkillsSection)

- ### Structural: This layer is responsible for the structure (App, Layout)

- ### Container: This layer communicates with the Application layer (LessonPage, LessonsList)

### The Аpplication layer contains hooks (usePreviewLesson, usePreviewLessonsLessons)

### The API layer contains requests to the server, API providers and communicates with the Domain (useCompileArduino)
