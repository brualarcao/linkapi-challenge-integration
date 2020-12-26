import { Router } from 'express';
import MakeOrderController from '../controllers/MakeOrderController';
import ReceiveOrderController from '../controllers/ReceiveOrderController';

const orderRoutes = Router();

const makeOrder = new MakeOrderController();
const receiveOrder = new ReceiveOrderController();

orderRoutes.post('/order', makeOrder.create);
orderRoutes.get('/order', receiveOrder.receive);

export default orderRoutes;
