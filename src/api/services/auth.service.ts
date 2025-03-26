/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from "axios";

const AUTH_ROUTES = {
  LOGIN: `/api/auth/login`,
  LOGOUT: `/api/auth/logout`,
  REFRESH: `/api/auth/refresh`,
  GET_ADMIN_DATA: `/api/admin`,
  KAKAO_SOCIAL_LOGIN: `/api/auth/kakao/login`,
  KAKAO_SOCIAL_LOGOUT: `/api/auth/naver/login`,
  NAVER_SOCIAL_LOGIN: `/api/auth/naver/login`,
  NAVER_SOCIAL_LOGOUT: `/api/auth/naver/logout`,
} as const;

export class AuthService {
  _ajax: AxiosInstance;

  constructor(_ajax: AxiosInstance) {
    this._ajax = _ajax;
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

  async getMyInfo(): Promise<any> {
    const token = localStorage.getItem("accessToken");

    if (token) {
      this._ajax.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      throw new Error("No access token found");
    }
    const { data } = await this._ajax.get(`/api/admin/me`);
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
}
