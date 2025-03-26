import { create } from "zustand";

export type reservationType = {
  userType: "self" | "other";
  name: string;
  tell: string;
  birth: string | number;
  address: {
    zipcode: string;
    basic: string;
    detail: string;
  };
  gender: "male" | "female";
  email: string;
  reserveType: "combined" | "public";
  reservationDate: Date;
  reservationTime: string;
  memo?: string;
};

type ReservationState = {
  userReservation: reservationType;
  setReservation: (userReservation: Partial<reservationType>) => void;
};

export const useReservationStore = create<ReservationState>((set) => ({
  userReservation: {
    userType: "self",
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
    reserveType: "combined",
    reservationDate: new Date(),
    reservationTime: "",
    memo: "",
  },
  setReservation: (userReservation: Partial<reservationType>) =>
    set((state) => ({
      userReservation: { ...state.userReservation, ...userReservation },
    })),
}));

export const loginUserStore = create((set) => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    setAccessToken: (token: string) => {
      localStorage.setItem("accessToken", token);
      set({ accessToken: token });
    },
  };
});
