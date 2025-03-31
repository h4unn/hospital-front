import { AxiosInstance } from "axios";

export class OrderService {
  private _ajax: AxiosInstance;

  constructor(_ajax: AxiosInstance) {
    this._ajax = _ajax;
  }

  async createOrder(data: orderRequestBody): Promise<void> {
    await this._ajax.post("/api/order", data);
  }
}
