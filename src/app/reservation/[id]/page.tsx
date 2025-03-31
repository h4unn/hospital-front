"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { productService, authService, orderService } from "@/api/services";

import Section from "@/components/UI/Section";
import Loading from "@/components/Loading";
import ReservationCheckUpView from "@/views/ReservationCheckUp/ReservationCheckUp";

export default function Reservation() {
  const { id } = useParams();
  const router = useRouter();

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

  const { mutate: setReservation } = useMutation({
    mutationFn: (data: orderRequestBody) => orderService.createOrder(data),

    onSuccess: () => {
      alert("예약이 완료되었습니다.");
      router.push("/");
    },
    onError: (error) => {
      console.error("예약 실패", error);
    },
  });

  const isLoading = isProductLoading && isUserLoading;
  const isError = isProductError && isUserError;

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
          onSubmit={(data) => {
            setReservation({
              productId: productData.data._id,
              hospitalId: userData.data._id,
              reservation_date: data.reservation_date,
              name: data.name,
              tell: data.tell,
              birth: data.birth,
              email: data.email,
              address: {
                zipcode: data.address.zipcode,
                basic: data.address.basic,
                detail: data.address.detail,
              },
              gender: data.gender,
              total_price: data.total_price,
            });
            // 예약 성공 후 처리
          }}
        />
      )}
    </Section>
  );
}
