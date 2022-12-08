# File Parser - Node service

This folder contains all the information regarding the Node.js service of the File parser project.

## Dependencies

* [Node.js (Included in the base container)](https://nodejs.org/)
* [npm (Included in the base container)](https://www.npmjs.com/)
* [Express.js](http://expressjs.com)
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [Standard](https://www.npmjs.com/package/standard)
* [Axios](https://www.npmjs.com/package/axios)
* [Nodemon](https://www.npmjs.com/package/nodemon)

## Access the Docker container

After following the instructions from the `README.md` of the root folder, a new service shoud have been created, with a name similar to `toolbox_node` (Note: check if the name was not already used in another service in your machine, or Docker may have added some numbers to the newly created one).

Run the following command in order to access the Docker container:


```sh
docker exec -it toolbox_node bash
```

You should be located in the `/home/node` folder inside the container. The next instruction will install the dependencies from the `package.json` in order to properly execute the service:

```sh
npm install
```

## Run tests

To run the tests, just call the following command:

```sh
npm test
```

## Start the service

To run the service, just call the following command:

```sh
npm start
```

The service should be available in `http://localhost:9020`.

## Available endpoints

* `/files/list` Lists all the files that have been found in the external API
* `files/data?fileName` Lists the lines of a fileName if especified, otherwise it will list the lines of all the available files in the API (the lines without the expected format are discarded)


