import { Request, Response } from "express"
import OrderRepository from "../repositories/OrderRepository"

export default class ReceiveOrderController {
  async receive(request: Request, response: Response): Promise<Response> {
    const orderRepository = new OrderRepository()

    try{
      const orders = await orderRepository.listOrders()

      return response.status(200).json(orders)
    } catch (err) {
      console.log(err)
      return response.status(200).json({ erro: 'Ocorreu um erro ao retornar as informações da collection' })
    }
  }
}
