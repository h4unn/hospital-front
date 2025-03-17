"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { productService } from "@/api/services";
import { selectProductService } from "@/api/services";

import ProductRegister from "@/views/productRegister/ProductRegister";
import Loading from "@/components/Loading";

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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["selectProduct", "getSelectProducts"],
    queryFn: () => selectProductService.getSelectProducts(),
  });

  if (isLoading) return <Loading />;

  if (isError) return <div>{error?.message}</div>;

  return (
    <>
      <ProductRegister productFn={productFn} data={data} />
    </>
  );
}
