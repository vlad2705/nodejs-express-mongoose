import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';

import {requestLoggerMiddleware} from "./request.logger.middleware";
import {RegisterRoutes} from "./routes";
import "./controller/todo.controller";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLoggerMiddleware);

RegisterRoutes(app);

try {
    const swaggerDocument = require('../swagger.json');
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
    console.error('Unable to read swagger.json', err);
}

export {app};
