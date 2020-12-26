import { Request, Response } from 'express';
import moment from 'moment';
import { IDeal, IDealReturn } from '../DTOS/IDeal';
import OrderBlingService from '../services/OrderBlingService';
import pipe from '../apis/pipeApi';
import OrderRepository from '../repositories/OrderRepository';

const api_token = process.env.API_KEY_PIPE;
const status = 'won';

const orderBlingService = new OrderBlingService();

export default class CreateOrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const orderRepository = new OrderRepository();

    try {
      const deals = await pipe
        .get('/deals', {
          // requisição para obter os pedidos do pipedrive
          params: {
            api_token,
            status,
          },
        })
        .then(response => {
          return response.data;
        });

      const dates: string[] = [];
      const new_deals: IDeal[] = [];

      let deal: IDealReturn;
      for (deal of deals.data) {
        const checkDate = await orderRepository.findByDate(
          moment(deal.won_time).format('YYYY-MM-DD')
        ); // Checa se já existe registro com essa data no banco

        if (checkDate) {
          const checkDeal = await orderRepository.findDeal(
            deal.id,
            moment(deal.won_time).format('YYYY-MM-DD')
          ); // Se já existe, procura o registro

          if (checkDeal) {
            // Se já está salvo, continua para o próximo passo
            continue;
          } else {
            orderBlingService.execute(
              // Caso não, cria a ordem no bling e insere os registros no array
              deal.org_name,
              deal.cc_email,
              deal.id,
              deal.title,
              deal.value
            );

            await orderRepository.update(
              {
                deal_id: deal.id,
                title: deal.title,
                value: deal.value,
                org_name: deal.org_name,
                cc_email: deal.cc_email,
                owner_name: deal.owner_name,
                person_name: deal.person_name,
                won_time: deal.won_time,
                contact_email: deal.person_id && deal.person_id.email[0].value,
                contact_phone: deal.person_id && deal.person_id.phone[0].value,
              },
              moment(deal.won_time).format('YYYY-MM-DD')
            );
          }
        } else {
          orderBlingService.execute(
            // Se não tem registro na data, insere a ordem no bling
            deal.org_name,
            deal.cc_email,
            deal.id,
            deal.title,
            deal.value
          );

          if (!dates.includes(moment(deal.won_time).format('YYYY-MM-DD'))) {
            // Checa se o registro já inclui o horário do ganho
            dates.push(moment(deal.won_time).format('YYYY-MM-DD'));
          }

          new_deals.push({
            deal_id: deal.id,
            title: deal.title,
            value: deal.value,
            org_name: deal.org_name,
            cc_email: deal.cc_email,
            owner_name: deal.owner_name,
            person_name: deal.person_name,
            won_time: deal.won_time,
            contact_email: deal.person_id && deal.person_id.email[0].value,
            contact_phone: deal.person_id && deal.person_id.phone[0].value,
          });
        }
      }

      for (const date of dates) {
        const final_deals = new_deals.filter(
          (new_deal: IDeal) =>
            date === moment(new_deal.won_time).format('YYYY-MM-DD')
        ); // retorna todos os ganhos para cada data

        let total_value = 0;

        final_deals.map((d: IDeal) => (total_value += d.value)); // calcula o valor total

        await orderRepository.create({
          // salva o pedido no banco
          date,
          deals: final_deals,
          total: total_value,
        });
      }

      return response
        .status(200)
        .json({ message: 'Parabéns, dados gerados com sucesso!' });
    } catch (err) {
      console.log(err);
      return response
        .status(200)
        .json({ erro: 'Erro ao gerar dados. Por favor, tente novamente.' });
    }
  }
}
