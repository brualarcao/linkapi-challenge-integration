import { Deal } from '../schemas/Deal';
import { Order } from '../schemas/Order';
import { IDeal } from './IDeal';
import { IOrder } from './IOrder';

export default interface IOrderRepository {
  // Data Transfer Object do repositorio Order
  create(data: IOrder): Promise<Order>;
  update(data: IDeal, date: string): Promise<Order | null>;
  findDeal(id: number, date: string): Promise<Deal | null>;
  findByDate(date: string): Promise<Order | null>;
  listOrders(): Promise<Order[]>;
}
