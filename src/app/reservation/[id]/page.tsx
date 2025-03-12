"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { productService, authService } from "@/api/services";

import Loading from "@/components/Loading";

export default function Reservation() {
  const { id } = useParams();

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["reservation", id],
    queryFn: () => {
      if (typeof id === "string") {
        return productService.getProductById({ id });
      }
      throw new Error("Invalid reservation ID");
    },
  });

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => {
      if (typeof id === "string") {
        return authService.getUserAdmin({ id });
      }
      throw new Error("Invalid reservation ID");
    },
  });

  if (isProductLoading && isUserLoading) return <Loading />;

  if (isProductError && isUserError) {
    return (
      <div>
        {userError.message} {productError.message}
      </div>
    );
  }
  console.log(productData, userData);

  return (
    <div>
      <h1>Reservation {id}</h1>
    </div>
  );
}
