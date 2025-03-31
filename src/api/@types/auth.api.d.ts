type loginRequestBody = {
  id: string;
  password: string;
  name: string;
  email: string;
  role?: role;
  hospital: {
    hospitalName: string;
    address: string;
    latitude?: string;
    longitude?: string;
    businessNumber: string;
  };
};
type loginRequestBodyType = {
  email: string;
  password: string;
};

type loginRequestType = {
  body: loginRequestBodyType;
};

type loginRequest = {
  body: loginRequestBody;
};

type ILoginResponse = {
  _id?: string;
  password: string;
  name: string;
  email: string;
  role?: role;
  hospital: {
    _id?: string;
    id?: string;
    hospitalName: string;
    address: string;
    latitude?: string;
    longitude?: string;
    businessNumber: string;
  };
};

type loginResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: ILoginResponse;
};

type loginResponseType = {
  data: loginResponse;
};

type userResposenType = {
  data: ILoginResponse;
};
