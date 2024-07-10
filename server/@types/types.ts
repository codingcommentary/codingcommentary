export interface IPaymentInfo {
  id?: string;
  [key: string]: any;
}

export interface IMailData {
  order: {
    _id: string;
    name: string;
    price: number;
    date: string;
  };
}
