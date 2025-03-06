"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { productService } from "@/api/services";

import ProductRegister from "@/views/productRegister/ProductRegister";

export default function Register() {
  const router = useRouter();
  const productFn = async (data: productRequestType) => {
    await productService.createProduct({
      body: {
        name: data.name,
        description: data.description,
        price: data.price,
        selective: data.selective,
        hospitalId: data.hospitalId,
      },
    });
    router.push("/product");
  };

  return (
    <>
      <ProductRegister productFn={productFn} />
    </>
  );
}
