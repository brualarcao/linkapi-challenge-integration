import { getMongoRepository, MongoRepository } from 'typeorm';
import { IDeal } from '../DTOS/IDeal';
import { IOrder } from '../DTOS/IOrder';
import IOrderRepository from '../DTOS/IOrderRepository';
import { Deal } from '../schemas/Deal';
import { Order } from '../schemas/Order';

export default class OrderRepository implements IOrderRepository {
  private ormRepository: MongoRepository<Order>;

  constructor() {
    this.ormRepository = getMongoRepository(Order, 'default');
  }

  public async create({
    // Salva um novo pedido no banco
    date,
    deals,
    total,
  }: IOrder): Promise<Order> {
    const order = this.ormRepository.create({
      date,
      deals,
      total,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async update(
    {
      // Insere um novo negocio no banco
      deal_id,
      title,
      value,
      org_name,
      cc_email,
      owner_name,
      person_name = '',
      won_time,
      contact_email = '',
      contact_phone = '',
    }: IDeal,
    date: string
  ): Promise<Order | null> {
    const orderSaved = await this.ormRepository.findOne({ date });

    const new_deal: Deal = {
      deal_id,
      title,
      value,
      org_name,
      cc_email,
      owner_name,
      contact: person_name,
      won_time,
      contact_email,
      contact_phone,
    };

    if (orderSaved) {
      orderSaved.deals.push(new_deal); // Insere um novo negocio

      orderSaved.total += new_deal.value; // Atualiza o valor

      const order = await this.ormRepository.save(orderSaved); // Atualiza o pedido

      return order;
    }

    return null;
  }

  public async findDeal(id: number, date: string): Promise<Deal | null> {
    const order = await this.ormRepository.findOne({ date }); // Encontra um pedido pela data

    if (order) {
      // Verifica se o negocio ja existe no banco
      const deal = order.deals.filter(
        (dealSaved: Deal) => dealSaved.deal_id === id
      );

      return deal[0];
    }

    return null;
  }

  public async findByDate(date: string): Promise<Order | null> {
    const order = await this.ormRepository.findOne({ date });

    if (order) {
      return order;
    }

    return null;
  }

  public async listOrders(): Promise<Order[]> {
    const orders = await this.ormRepository.find();

    return orders;
  }
}
