"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { authService } from "@/api/services";
import { useUser } from "@/store/user";

import LoginView from "@/views/login/Login";

export default function Login() {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);
  const { setUser } = useUser();

  const { mutate: login } = useMutation({
    mutationFn: async (data: loginRequestBodyType) => {
      const response = await authService.login({
        body: { email: data.email, password: data.password },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        setUser({
          email: data.user?.email,
          name: data.user?.name,
          token: data.accessToken,
          loginState: true,
        });
        router.push("/");
      }
    },
    onError: () => {
      setLoginError(true);
    },
  });

  return (
    <React.Fragment>
      <LoginView loginFn={login} isError={loginError} />
    </React.Fragment>
  );
}
