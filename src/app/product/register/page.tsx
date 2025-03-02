"use client";

import React from "react";
import ProductRegister from "@/views/productRegister/ProductRegister";
import { productService } from "@/api/services";

export default function Register() {
  const productFn = async (data: productRequestType) => {
    const response = await productService.createProduct({
      body: {
        name: data.name,
        description: data.description,
        price: data.price,
        selective: data.selective,
        hospitalId: data.hospitalId,
      },
    });
    const result = response;
    console.log(result);

    return result;
  };
  return (
    <>
      <ProductRegister productFn={productFn} />
    </>
  );
}
