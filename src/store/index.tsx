import { create } from "zustand";

export type reservationType = {
  // 예약자 타입
  userType?: "self" | "auther";
  // 예약 타입
  reserveType?: "combined" | "public";

  name: string;
  tell: string;
  birth: string;
  address: {
    zipcode: string;
    basic: string;
    detail: string;
  };
  gender: string;
  email: string;
  total_price: number;
  memo?: string;
  reservation_date: Date;
  reservation_time: string;
  status?: "pending" | "success" | "cancel";

  productId: string;
  hospitalId: string;
  select_product?: string[];
};

type ReservationState = {
  userReservation: reservationType;
  setReservation: (userReservation: Partial<reservationType>) => void;
};

export const useReservationStore = create<ReservationState>((set) => ({
  userReservation: {
    userType: "self",
    reserveType: "combined",
    name: "",
    tell: "",
    birth: "",
    address: {
      zipcode: "",
      basic: "",
      detail: "",
    },
    gender: "male",
    email: "",
    total_price: 0,
    memo: "",
    status: "pending",
    reservation_date: new Date(),
    reservation_time: "",
    productId: "",
    hospitalId: "",
  },
  setReservation: (userReservation: Partial<reservationType>) =>
    set((state) => ({
      userReservation: { ...state.userReservation, ...userReservation },
    })),
}));
