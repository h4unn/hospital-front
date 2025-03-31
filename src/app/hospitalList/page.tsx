"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { productService } from "@/api/services";
// import { useReservationStore } from "@/store";

import Loading from "@/components/Loading";
import ProductListView from "@/views/productList/ProductListView";

export default function Home() {
  const router = useRouter();
  const {
    data: productData,
    isLoading: productIsLoading,
    isError: productIsError,
    error: productError,
  } = useQuery({
    queryKey: ["products", "list"],
    queryFn: () => productService.getProducts(),
    refetchOnWindowFocus: false,
    gcTime: 5 * 10 * 1000,
    staleTime: 5 * 10 * 1000,
  });

  if (productIsLoading) return <Loading />;

  if (productIsError) {
    return (
      <div>
        <p>{productError.message}</p>
      </div>
    );
  }

  function handleClick(id: string) {
    router.push(`reservation/${id}`);
  }
  return (
    <>
      <ProductListView products={productData.data} onClick={handleClick} />
    </>
  );
}
