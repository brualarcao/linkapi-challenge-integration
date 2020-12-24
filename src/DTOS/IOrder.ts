import { IDeal } from "./IDeal"

export interface IOrder { // Data Transfer Object do Order
  date: string;
  deals: IDeal[];
  total: number;
}
