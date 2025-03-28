"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { productService, authService } from "@/api/services";

import ProductListView from "@/views/productList/ProductListView";
import Loading from "@/components/Loading";

export default function ProductList() {
  const {
    data: prodcutItems,
    isLoading: productLoading,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["products", "list"],
    queryFn: () => productService.getProducts(),
    refetchOnWindowFocus: false,
    gcTime: 5 * 10 * 1000,
    staleTime: 5 * 10 * 1000,
  });

  const {
    data: hospitalData,
    isLoading: hospitalLoading,
    isError: isHospitalError,
    error: hospitalError,
  } = useQuery({
    queryKey: ["products", "hospital"],
    queryFn: () => authService.getMyInfo(),
    refetchOnWindowFocus: false,
    gcTime: 5 * 10 * 1000,
    staleTime: 5 * 10 * 1000,
  });

  if (productLoading && hospitalLoading) return <Loading />;

  if (isProductError && isHospitalError) {
    return (
      <div>
        <p>{productError.message}</p>
        <p>{hospitalError.message}</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ProductListView
        products={prodcutItems.data}
        admin={hospitalData?.data || ({} as ILoginResponse)}
      />
    </React.Fragment>
  );
}
//
