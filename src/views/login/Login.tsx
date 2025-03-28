"use client";
// import axios from "axios";
import cn from "classnames/bind";
import styles from "./Login.module.scss";
import Link from "next/link";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";

import Input from "@/components/Input";
import Button from "@/component/Button/Button";

const cx = cn.bind(styles);

type LoginFormType = {
  email: string;
  password: string;
};
type loginViewProps = {
  loginFn: (data: LoginFormType) => void;
  isError?: boolean;
};

const LoginView = (props: loginViewProps) => {
  const { loginFn } = props;

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("이메일 형식이 아닙니다")
      .required("아이디를 입력해주세요")
      .max(30, "아이디는 30자 이하로 입력해주세요")
      .lowercase(),
    password: yup
      .string()
      .required("비밀번호를 입력해주세요")
      .min(6, "비밀번호는 6자 이상이어야 합니다"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return (
    <div className={cx("login_wrap")}>
      <h1 className={cx("tit")}>로그인</h1>
      <form className={cx("login_form")} onSubmit={handleSubmit(loginFn)}>
        <Input
          label="아이디"
          type="email"
          {...register("email")}
          error={errors ? errors.email : undefined}
        />
        <Input
          label="비밀번호"
          type="password"
          {...register("password")}
          error={errors ? errors.email : undefined}
        />
        {props.isError && (
          <p className={cx("errorMessage", "LoginFailed")}>
            입력하신 정보를 확인해주세요.
          </p>
        )}
        <div className={cx("button_group")}>
          <Button
            type="submit"
            label="로그인"
            backgroundColor="#FFEA3C"
            borderColor="#BFC662"
            className={cx("login_button")}
          />
          <Link href="signup">
            <Button
              label="회원가입"
              backgroundColor="#FFFFFF"
              borderColor="#CCCCCC"
              className={cx("signup_button")}
            />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
