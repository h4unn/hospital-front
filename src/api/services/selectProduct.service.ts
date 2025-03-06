/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from "axios";

// 상품 관련 API 경로 정의
const SELECT_PRODUCT_ROUTES = {
  /** 상품 조회 */
  GET_SELECTPRODUCTS: "/api/selectProduct",
  /** 상품 상세 조회 */
  GET_SELECTPRODUCT: "/api/selectProduct/:selectProductId",
  /** 상품 생성 */
  CREATE_PRODUCT: "/api/selectProduct",
  /** 상품 수정 */
  UPDATE_PRODUCT: "/api/selectProduct/:selectProductId",
  /** 상품 삭제 */
  DELETE_PRODUCT: "/api/selectProduct/:selectProductId",
} as const;

export class SelectProductService {
  private _ajax: AxiosInstance;
  constructor(_ajax: AxiosInstance) {
    this._ajax = _ajax;
  }

  // 상품 조회
  async getSelectProducts(): Promise<any> {
    const token = localStorage.getItem("accessToken");

    if (token) {
      this._ajax.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      throw new Error("No access token found");
    }

    const { data } = await this._ajax.get(
      SELECT_PRODUCT_ROUTES.GET_SELECTPRODUCTS
    );
    return data;
  }

  // 상품 상세 조회
  async getSelectProduct(
    req: getProductByIdRequest
  ): Promise<getProductByIdResponse> {
    const token = localStorage.getItem("accessToken");

    if (token) {
      this._ajax.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      throw new Error("No access token found");
    }

    const { id } = req;
    const { data } = await this._ajax.get(
      SELECT_PRODUCT_ROUTES.GET_SELECTPRODUCT.replace(":productId", id)
    );

    return data;
  }

  // 상품 생성
  async createSelectProduct(req: productRequest): Promise<productResponseType> {
    const { body } = req;
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }
    this._ajax.defaults.headers.Authorization = `Bearer ${token}`;

    const { data } = await this._ajax.post(
      SELECT_PRODUCT_ROUTES.CREATE_PRODUCT,
      body
    );
    return data;
  }
}
