import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReservationStore } from "@/store";

// 리디렉션 로직을 처리하는 커스텀 훅
export const useCheckReservation = (redirectPath = "/") => {
  const router = useRouter();
  const { userReservation } = useReservationStore();

  useEffect(() => {
    // 필수 필드 확인
    const requiredFields = ["name", "tell", "birth", "reservation_date"];

    const isMissingRequiredField = requiredFields.some(
      (field) => !userReservation[field as keyof typeof userReservation]
    );

    if (isMissingRequiredField) {
      router.push(redirectPath);
    }
  }, [userReservation, router, redirectPath]);
};
