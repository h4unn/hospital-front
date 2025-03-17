"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { productService } from "@/api/services";

import Loading from "@/components/Loading";
import Section from "@/components/UI/Section";
import ProductDetail from "@/views/ProductDetail";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      if (typeof id === "string") {
        return productService.getProductById({ id });
      }
      throw new Error("Invalid product ID");
    },
    refetchOnWindowFocus: false,
    gcTime: 5 * 10 * 1000,
    staleTime: 5 * 10 * 1000,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <div>상품 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <Section title={"상품 상세"}>
      <ProductDetail product={data.data} />
    </Section>
  );
}
