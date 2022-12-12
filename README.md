# If Gift App

<p align="center">
  <img src="https://user-images.githubusercontent.com/66889974/206901199-7b397c3a-a141-4f9a-bd42-56557fdcfb25.png" />
</p>

If-Gift is an app that was born from the necessity act of gift-giving and how to improve it, knowing what the other person wants. In this app each user has the capacity to write different lists (Wants, Avoids, Registries or Charities) that other people can see. Also you can manage and create lists for other users, the one you can compare and adjust to the other users wishes and needs.

## Screenshots

<p align="center">
  <img src="https://user-images.githubusercontent.com/66889974/206901275-eaa78e89-f02c-412d-9109-ffd61ea9bcc4.png" />
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/66889974/206901336-9edac0ab-9af2-4aca-a382-dc9e4211930c.png" />
</p>

## Getting started
1. Clone the repo
```shell
git clone https://github.com/GustavoSilvaNavarro/ifgift
cd ifgift
```

2. Run command to install dependencies backend and frontend
```powershell
npm run install
```

### Server
1. Create a .env file with the following keys
```js
// Database keys | MongoDB
MONGODB_URI_LINK= //example mongodb://127.0.0.1:27017/ifgift
SECRET_KEY_JWT=
```

2. Run development server
```shell
npm run dev:server
```

### Client
1. Create a .env file with the following keys
```js
// Auth0 KEYS for client side | https://auth0.com/docs/quickstart/backend/nodejs/interactive
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
BASE_URL_API= // url to connect server
```
2. Run react in developer mode
```shell
npm start
```

## Built with
### Backend
* [Koa](https://koajs.com/) - web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs
* [NodeJs](https://nodejs.org/en/) - An open-source, cross-platform JavaScript runtime environment.
* [Mongoose](https://mongoosejs.com/docs/queries.html) - ODM for MongoDB.
* [MongoDB](https://www.mongodb.com/) - No-SQL document database.
* [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript.

### Frontend
* [React](https://reactjs.org/) - Front end library for building user interfaces.
* [Chakra UI](https://chakra-ui.com/) - simple, modular and accessible component library that gives you the building blocks you need to build your React applications.
* [Auth0](https://auth0.com/) - Service for authentication and authorization.
* [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript.

## Collaborators
* Gustavo Silva Navarro - [GitHub](https://github.com/GustavoSilvaNavarro) - [Linkedin](https://www.linkedin.com/in/gustavo-silva-navarro/)
* James Warnsby - [GitHub](https://github.com/jwarnsby) - [Linkedin](https://www.linkedin.com/in/jameswarnsby)
