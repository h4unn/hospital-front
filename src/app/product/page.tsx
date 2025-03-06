"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { productService } from "@/api/services";

import ProductListView from "@/views/productList/ProductListView";
import Loading from "@/components/Loading";

export default function ProductList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", "list"],
    queryFn: () => productService.getProducts(),
    refetchOnWindowFocus: false,
    gcTime: 5 * 10 * 1000,
    staleTime: 5 * 10 * 1000,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return <div>{error.message}</div>;
  }

  console.log(data.data);

  return (
    <React.Fragment>
      <ProductListView products={data.data} />
    </React.Fragment>
  );
}
//
