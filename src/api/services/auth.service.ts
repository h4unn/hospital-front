/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from "axios";

const AUTH_ROUTES = {
  LOGIN: `/api/auth/login`,
  SIGNUP: `/api/admin`,
  LOGOUT: `/api/auth/logout`,
  REFRESH: `/api/auth/refresh`,
  GET_ADMIN_DATA: `/api/admin`,
} as const;

export class AuthService {
  _ajax: AxiosInstance;

  constructor(_ajax: AxiosInstance) {
    this._ajax = _ajax;
  }
  async signup(req: any): Promise<any> {
    const { body } = req;
    try {
      const { data } = await this._ajax.post(AUTH_ROUTES.SIGNUP, body);
      return data;
    } catch {
      throw new Error("회원가입 실패");
    }
  }

  async login(req: loginRequestType): Promise<loginResponseType> {
    const { body } = req;
    try {
      const { data } = await this._ajax.post(AUTH_ROUTES.LOGIN, body);

      return data;
    } catch {
      throw new Error("로그인 실패");
    }
  }

  async getMyInfo(token: string): Promise<userResposenType> {
    try {
      if (!token) {
        throw new Error("No access token found");
      }

      this._ajax.defaults.headers.Authorization = `Bearer ${token}`;
      const { data } = await this._ajax.get(`/api/admin/me`);

      if (!data) {
        throw new Error("No data found");
      }

      return data;
    } catch (error) {
      let errorMessage = "Failed to fetch user data";

      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      } else if (typeof error === "string") {
        errorMessage += `: ${error}`;
      }

      throw new Error(errorMessage);
    }
  }

  async getAdmings(): Promise<userResposenType[]> {
    const { data } = await this._ajax.get(AUTH_ROUTES.GET_ADMIN_DATA);
    return data;
  }

  async getUserAdmin({ id }: { id: string }): Promise<userResposenType> {
    const token = localStorage.getItem("accessToken");

    if (token) {
      this._ajax.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      throw new Error("No access token found");
    }

    const { data } = await this._ajax.get(
      `${AUTH_ROUTES.GET_ADMIN_DATA}/${id}`
    );
    return data;
  }

  async logout(): Promise<void> {
    const token = localStorage.getItem("accessToken");

    if (token) {
      this._ajax.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      throw new Error("No access token found");
    }

    await this._ajax.post(AUTH_ROUTES.LOGOUT);
  }
}
