interface IProduct {
  __v?: number;
  _id?: string;
  createdAt?: string;
  description: string;
  hospitalId?: { _id: string };
  id: string;
  name: string;
  price: number;
  selective?: string[];
  updatedAt?: string;
}
