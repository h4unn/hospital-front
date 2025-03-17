import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReservationStore } from "@/store";

// 리디렉션 로직을 처리하는 커스텀 훅
export const useCheckReservation = () => {
  const router = useRouter();
  const { userReservation } = useReservationStore();

  useEffect(() => {
    // name, tell, reservationDate가 비어있는지 확인
    if (
      !userReservation.name ||
      !userReservation.tell ||
      !userReservation.reservationDate
    ) {
      router.push("/"); // 조건이 충족되지 않으면 "/"로 리디렉션
    }
  }, [
    userReservation.name,
    userReservation.tell,
    userReservation.reservationDate,
    router,
    ,
  ]);
};
