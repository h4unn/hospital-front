type productRequestType = {
  name: string;
  description: string;
  price: number;
  selective?: string[];
  hospitalId?: string;
};

type productRequest = {
  body: productRequestType;
};

type productResponseType = {
  id: string;
  name: string;
  description: string;
  price: number;
  hospitalId: string;
};
