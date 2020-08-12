import express, { request, response } from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';

const routes = express.Router();

const usersController = new UsersController();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

routes.get('/', (request, response) => {
    console.log('Testing');

    return response.send("Success");
})

routes.post('/login', usersController.index)
routes.post('/signin', usersController.create);

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;