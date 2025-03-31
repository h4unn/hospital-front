import React from "react";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import Reservation from "@/views/reservation/ReservationView";

export default async function Home() {
  const router = useRouter();
  const { mutate: createReservation } = useMutation({
    mutationFn: async (data: any) => {
      // const response = await reservationService.createReservation(data);
      // return response.data;
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Error creating reservation:", error);
    },
  });
  return (
    <React.Fragment>
      <Reservation />
    </React.Fragment>
  );
}
