"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/api/services";

import LoginView from "@/views/login/Login";

export default function Login() {
  const router = useRouter();

  const onSubmit = async (data: loginRequestBodyType) => {
    const response = await authService.login({
      body: { email: data.email, password: data.password },
    });
    const result = response.data;

    if (result) {
      localStorage.setItem("accessToken", result.accessToken);
    }
    router.push("/");
  };

  return (
    <React.Fragment>
      <LoginView loginFn={onSubmit} />
    </React.Fragment>
  );
}
//
