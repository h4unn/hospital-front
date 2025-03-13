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
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", "list"],
    queryFn: () => productService.getProducts(),
    refetchOnWindowFocus: false,
    gcTime: 5 * 10 * 1000,
    staleTime: 5 * 10 * 1000,
  });

  // const setReservation = useReservationStore((state) => state.setReservation);

  if (isLoading) return <Loading />;

  if (isError) {
    return <div>{error.message}</div>;
  }

  function handleClick(id: string) {
    router.push(`reservation/${id}`);
  }

  return (
    <>
      <ProductListView products={data.data} onClick={handleClick} />
    </>
  );
}
