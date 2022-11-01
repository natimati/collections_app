# Intern - Collections App - Natalia Mateusiak

## Introduction:
This application was created during the internship held by Itransition. 
Functionalities were described in the specification of the final internship project. Application contain following features:
    - everyone can visit main page, collections and items pages,
    - user can create an account and sign in, 
    - authenticated users can create, edit and delete their own collection and items. They can also add comments to other user items,
    - users with admin status can delete other users, edit and delete all collections and items in application, 
    - collection create form contains title, topic (one item of predefined list), image url, description and additional fields. Additional fields map to item properties whose value can be defined when an item is added,
    - on main page all user can see five latest items and five largest collections,

## Used technologies:

- [React v 18.1.0](https://reactjs.org)
- [Material UI](https://mui.com/)
- [Styled-Component](https://styled-components.com/)
- [ky](https://www.npmjs.com/package/ky)
- [React Router](https://reactrouter.com)
- [React Context](https://reactjs.org/docs/context.html)
- [React Hook Form](https://react-hook-form.com/)
- [React Quill](https://github.com/zenoamaro/react-quill)
- [React-toastify](https://fkhadra.github.io/react-toastify/introduction/)
- [algoliasearch](https://www.algolia.com/)
- [i18next](https://react.i18next.com/)

## Project assumptions:

Project combines frontend and backend in one app. 

### Backend

On the server side there is `routes` directory - it handles requests from frontend app.
Data of application is stored in relational database - mysql. The connection and data related methods are handled in two main directories - migrations (containing queries to create tables etc. in db) and dataLayer (sequalize models).
In `middlewares` directory was implemented another important part of backend - middlewares responsible for handling authentication and autorization of requests.

### Frontend

Frontend is served when user send a get request to the backend on an endpoint which is not starting with '/api '. Frontend app is developed in `client` directory, where 4 main subdirectiories were added: `components`, `context`, `pages` and `api`.
- `api` is responsible for all request to backend. To handle that the library `ky` was used. 
- in `context` directory `UserContext` was defined - it contains information about current user and token. 
- each component represents small part of UI. Components are used on pages to render proper data. 

## Development:

Frontend app uses standard setup of create-react-app. To standarize how the code is written `prettier` was used. Backend part of app is bundled by `nodemon` and `typescript`.
To start the app install all dependencies in `root` and `client` directories (`npm install`) and simply run `npm run dev` command.

## Production setup and deployment:

For deployment I used heroku.

- [You find our app here](https://intern-collection-app.herokuapp.com/)
