import { Request, Response } from "express";
import { IDeal, IDealReturn } from "../dtos/IDeal";
import DealRepository from "../repositories/DealRepository";
import OrderBlingService from "../services/OrderBlingService";
import pipe from "../services/pipeUrl";

@@ -10,6 +11,8 @@ const orderBlingService = new OrderBlingService();

export default class CreateOrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const dealRepository = new DealRepository();

    try {
      const deals = await pipe.get(`/deals`, {
        params: {
@@ -20,15 +23,23 @@ export default class CreateOrderController {
        return response.data
      })

      let deal: IDealReturn
      for (deal of deals.data) {
        orderBlingService.execute(
          deal.org_name,
          deal.cc_email,
          deal.id,
          deal.title,
          deal.value,
        )

        await dealRepository.create({
          deal_id: deal.id,
          title: deal.title,
          value: deal.value,
          org_name: deal.org_name,
          cc_email: deal.cc_email,
        })
      }

      return response.status(200).json({ok:true})
    } catch (err) {
      console.log(err)
      return response.status(200).json({ erro: 'Erro ao criar seu pedido'});
    }
  }
};
