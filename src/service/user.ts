import axios from "axios";

interface ILoginType {
  email: string;
  password: string;
}

interface ILoginResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export const postLogin = (data: ILoginType) => {
  return axios.post<ILoginResponse>(
    `http://localhost:4000/api/auth/login`,
    data
  );
};
