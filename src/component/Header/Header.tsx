import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/api/services";
import cn from "classnames/bind";
import styles from "./Header.module.scss";
import headerLogo from "../../../public/images/easycare2.png";
import Link from "next/link";

const cx = cn.bind(styles);

const Header = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["User"],
    queryFn: () => authService.getMyInfo(),
    refetchOnWindowFocus: false,
    gcTime: 5 * 10 * 1000,
    staleTime: 5 * 10 * 1000,
  });

  const dataName = data?.data?.name;
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
          {!data ? (
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
            <div className={cx("loginBox")}>
              <p>안녕하세요. {dataName}님</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
