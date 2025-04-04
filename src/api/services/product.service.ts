/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from "axios";

// 상품 관련 API 경로 정의
const PRODUCT_ROUTES = {
  /** 상품 조회 */
  GET_PRODUCTS: "/api/product",
  /** 상품 상세 조회 */
  GET_PRODUCT: "/api/product/:productId",
  /** 상품 생성 */
  CREATE_PRODUCT: "/api/product",
  /** 상품 수정 */
  UPDATE_PRODUCT: "/api/product/:productId",
  /** 상품 삭제 */
  DELETE_PRODUCT: "/api/product/:productId",
} as const;

export class ProductService {
  private _ajax: AxiosInstance;
  constructor(_ajax: AxiosInstance) {
    this._ajax = _ajax;
  }

  // 상품 조회
  async getProducts(): Promise<any> {
    const token = localStorage.getItem("accessToken");

    if (token) {
      this._ajax.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      throw new Error("No access token found");
    }

    const { data } = await this._ajax.get(PRODUCT_ROUTES.GET_PRODUCTS);
    return data;
  }

  // 상품 상세 조회
  async getProductById(
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
      PRODUCT_ROUTES.GET_PRODUCT.replace(":productId", id)
    );

    return data;
  }

  // 상품 생성
  async createProduct(req: productRequest): Promise<productResponseType> {
    const { body } = req;
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }
    this._ajax.defaults.headers.Authorization = `Bearer ${token}`;

    const { data } = await this._ajax.post(PRODUCT_ROUTES.CREATE_PRODUCT, body);
    return data;
  }

  // 상품 수정
  // async updateProduct(
  //   req: updateProductRequest
  // ): Promise<updateProductResponse> {
  //   const { path, body } = req;

  //   if (!body.hospital) {
  //     throw new Error("병원 이름이 필요합니다.");
  //   }
  //   const url = pathToUrl(PRODUCT_ROUTES.UPDATE_PRODUCT, path);
  //   const { data } = await this._ajax.put(url, {
  //     ...body,
  //     hospital: body.hospital,
  //   });
  //   return data;
  // }

  // 상품 삭제
  // async deleteProduct(
  //   req: deleteProductRequest
  // ): Promise<deleteProductResponse> {
  //   const { path } = req;
  //   const url = pathToUrl(PRODUCT_ROUTES.DELETE_PRODUCT, path);
  //   const { data } = await this._ajax.delete(url);
  //   return data;
  // }
}
