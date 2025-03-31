"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/api/services";

import LoginView from "@/views/login/Login";

export default function Login() {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

  const onSubmit = async (data: loginRequestBodyType) => {
    try {
      const response = await authService.login({
        body: { email: data.email, password: data.password },
      });
      const result = response.data;

      if (result) {
        localStorage.setItem("accessToken", result.accessToken);
        setLoginError(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(true);
    }
  };

  return (
    <React.Fragment>
      <LoginView loginFn={onSubmit} isError={loginError} />
    </React.Fragment>
  );
}
