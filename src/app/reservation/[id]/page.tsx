"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { productService, authService } from "@/api/services";

import Section from "@/components/UI/Section";
import Loading from "@/components/Loading";
import ReservationCheckUpView from "@/views/ReservationCheckUp/ReservationCheckUp";

export default function Reservation() {
  const { id } = useParams();

  // 제품 데이터 가져오기
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
      throw new Error("params의 id가 없습니다.");
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
      if (typeof id === "string" && productData?.data.hospitalId?._id) {
        return authService.getUserAdmin({
          id: productData.data.hospitalId._id,
        });
      }
      throw new Error("병원 ID가 없습니다.");
    },
    enabled: !!productData?.data.hospitalId?._id,
  });

  const isLoading = isProductLoading || isUserLoading;
  const isError = isProductError || isUserError;

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="">
        {userError?.message} {productError?.message}
      </div>
    );
  }

  return (
    <Section title="건강 검진 예약">
      {productData && userData && (
        <ReservationCheckUpView
          productData={productData.data}
          userData={userData.data}
        />
      )}
    </Section>
  );
}
