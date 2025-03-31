"use client";
import React from "react";
import SignupView from "@/views/signUp/SignUp";

import { useRouter } from "next/navigation";
import { authService } from "@/api/services";
import { useMutation } from "@tanstack/react-query";

export default function Home() {
  const router = useRouter(); // 최상위 레벨에서 호출

  const signupMutation = useMutation({
    mutationFn: async (data: ILoginResponse) => {
      const response = await authService.signup(data);
      return response.data;
    },
    onSuccess: () => {
      alert("회원가입에 완료되었습니다.");
      router.push("/login"); // 성공 시 라우팅
    },
    onError: () => {
      alert("회원가입에 실패했습니다."); // 실패 시 알림
    },
  });

  return (
    <React.Fragment>
      <SignupView
        onSignup={(data: ILoginResponse) => signupMutation.mutate(data)}
      />
    </React.Fragment>
  );
}
