# File Parser - React service

This folder contains all the information regarding the React.js service of the File parser project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependencies

* [Node.js (Included in the base container)](https://nodejs.org/)
* [npm (Included in the base container)](https://www.npmjs.com/)
* [React.js](https://reactjs.org/)
* [React-Bootstrap](https://react-bootstrap.netlify.app/)
* [Axios](https://www.npmjs.com/package/axios)

## Access the Docker container

After following the instructions from the `README.md` of the root folder, a new service shoud have been created, with a name similar to `toolbox_react` (Note: check if the name was not already used in another service in your machine, or Docker may have added some numbers to the newly created one).

Run the following command in order to access the Docker container:


```sh
docker exec -it toolbox_react bash
```

You should be located in the `/home/node` folder inside the container. The next instruction will install the dependencies from the `package.json` in order to properly execute the service:

```sh
npm install
```

## Start the service

To run the service, just call the following command:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

