import React from "react";
import Image from "next/image";
import Link from "next/link";

import cn from "classnames/bind";
import styles from "./Header.module.scss";
import { useQuery, useMutation } from "@tanstack/react-query";

import { authService } from "@/api/services";
import headerLogo from "../../../public/images/easycare2.png";
import LoginBox from "./LoginBox";

const cx = cn.bind(styles);

const Header = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["User"],
    queryFn: async () => {
      const response = await authService.getMyInfo();
      return response.data;
    },
    refetchOnWindowFocus: false,
    gcTime: 5 * 10 * 1000,
    staleTime: 5 * 10 * 1000,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => authService.logout(),
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    },
  });

  return (
    <div className={cx("HeaderWrapper")}>
      <div className={cx("HeaderInn")}>
        <Link href={"/"}>
          <p className={cx("imageBox")}>
            <Image
              src={headerLogo}
              alt="EasyCare Logo"
              className={cx("logoIcon")}
            />
          </p>
        </Link>

        <div className={cx("loginContainer")}>
          {!user ? (
            <Link href={"/login"}>
              <div className={cx("imageBox")}>
                <Image
                  src="/images/login.png"
                  alt="예약조회"
                  className={cx("loginIcon")}
                  width={24}
                  height={24}
                />
                <span>관리자 로그인</span>
              </div>
            </Link>
          ) : (
            !isLoading && (
              <LoginBox user={user} logoutMutation={logoutMutation} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
