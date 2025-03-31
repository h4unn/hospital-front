type orderRequestBody = {
  name: string;
  tell: string;
  birth: string;
  address: {
    zipcode: string;
    basic: string;
    detail: string;
  };
  gender: string;
  email: string;
  total_price: number;
  memo?: string;
  reservation_date: Date;
  reservation_time?: string;
  status?: "pending" | "success" | "cancel";

  productId: string;
  hospitalId: string;
  select_product?: string[];
};
