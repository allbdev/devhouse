import multer from 'multer';
import { Router } from 'express';

import uploadConfig from './config/upload';
 
import HouseController from './controllers/HouseController';
import SessionController from './controllers/SessionController';
import ReserveController from './controllers/ReserveController';
import DashboardController from './controllers/DashboardController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses/:house_id', HouseController.destroy);
routes.get('/houses', HouseController.index);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/:reserve_id', ReserveController.destroy);

export default routes;
