"use client";

import React from "react";
import cn from "classnames/bind";
import styles from "./productList.module.scss";
// import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

const cx = cn.bind(styles);

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  selective?: string[];
  hospitalId: {
    _id: string;
    hospitalName: string;
    address: string;
  };
};

type ProductResponse = {
  data: Product[];
};

const productRequest = async () => {
  try {
    const response = await axios.get<ProductResponse>(
      "http://localhost:4000/api/product"
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("상품 목록을 가져오는 중 오류 발생:", error);
    return [];
  }
};

const ProductView = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const router = useRouter();

  const getProducts = async () => {
    try {
      const data = await productRequest();
      setProducts(data);
    } catch (error) {
      console.error("상품 목록을 가져오는 중 오류 발생:", error);
    }
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  const handleReservationClick = (
    productId: string,
    hospitalId: string,
    hospital: string,
    productName: string,
    productPrice: number
  ) => {
    router.push(
      `/reservation?productId=${productId}&hospitalId=${hospitalId}&hospital=${hospital}&productName=${encodeURIComponent(
        productName
      )}&productPrice=${productPrice}`
    );
  };

  const handleMapClick = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const naverMapUrl = `https://map.naver.com/v5/search/${encodedAddress}`;
    window.open(naverMapUrl, "_blank");
  };

  return (
    <div className={cx("productListWrapper")}>
      <section className={cx("productListSection")}>
        <h1 className={cx("productListTitle")}>상품 리스트</h1>
        <div className={cx("productListContainer")}>
          <div className={cx("listContainer")}>
            {products.map((product) => (
              <div key={product._id} className={cx("product")}>
                <div className={cx("productInfo")}>
                  <h1 className={cx("productName")}>{product.name}</h1>
                  <p className={cx("productDescription")}>
                    병원 : {product.hospitalId.hospitalName}
                  </p>
                  {/* <p className={cx("productDescription")}>
                    주소 : {product.hospitalId.address}
                  </p> */}
                  <p className={cx("productPrice")}>
                    가격 : {product.price.toLocaleString()}
                  </p>
                  <p className={cx("productDescription")}>
                    설명 : {product.description}
                  </p>
                  {/* <p className={cx("productDescription")}>
                    주소 : {product.hospitalId.address}
                  </p> */}
                </div>

                <div className={cx("productBtn")}>
                  <Button
                    label="지도보기"
                    backgroundColor="#FFFCE5"
                    borderColor="#BFC662"
                    width="302px"
                    height="54px"
                    onClick={() =>
                      handleMapClick(product.hospitalId.hospitalName)
                    }
                  />
                  <Button
                    label="예약하기"
                    backgroundColor="#FFFCE5"
                    borderColor="#BFC662"
                    width="302px"
                    height="54px"
                    onClick={() =>
                      handleReservationClick(
                        product._id,
                        product.hospitalId._id,
                        product.hospitalId.hospitalName,
                        product.name,
                        product.price
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductView;
