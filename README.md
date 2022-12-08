# File Parser

## Requirements

* [Docker](https://www.docker.com/)


## Set Docker environment

Run the following command in order to create the Docker containers for Node and React respectively:


```sh
docker-compose -f docker-compose.yml up
```

The containers will be created based on the instructions described in the `docker-compose.yml` file, where `node:14-slim` and `node:16-slim` are the base containers where the Node and React services will take place respectively.

Click [here](https://github.com/amasrie/file-parser/tree/master/node) and [here](https://github.com/amasrie/file-parser/tree/master/react) to read more about the Node and React applications respectively.
