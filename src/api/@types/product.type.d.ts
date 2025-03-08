interface IProduct {
  __v?: number;
  _id: string;
  createdAt?: string;
  description: string;
  hospitalId?: { _id: string };
  id: string;
  name: string;
  price: number;
  selective?: { _id: string; name: string; price: number };
  updatedAt?: string;
}
