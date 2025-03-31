import { AxiosInstance } from "axios";

export class OrderService {
  private _ajax: AxiosInstance;

  constructor(_ajax: AxiosInstance) {
    this._ajax = _ajax;
  }

  async createOrder(data: orderRequestBody): Promise<orderRequestBody> {
    const token = localStorage.getItem("accessToken");

    const response = await this._ajax.post("/api/order", data);
    return response.data;
  }
}
