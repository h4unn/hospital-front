import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserType = {
  email: string;
  name: string;
  token: string;
  loginState: boolean;
};

type UserState = {
  user: UserType;
  setUser: (user: Partial<UserType>) => void;
  logout: () => void;
};

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: {
        email: "",
        name: "",
        token: "",
        loginState: false,
      },
      setUser: (user: Partial<UserType>) => {
        set((state) => ({
          user: { ...state.user, ...user, loginState: !!user.token },
        }));
      },
      logout: () => {
        set({ user: { email: "", name: "", token: "", loginState: false } });
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export const useUser = () => {
  const { user, setUser, logout } = useUserStore();
  return { user, setUser, logout };
};
