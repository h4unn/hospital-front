import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import cn from "classnames/bind";
import styles from "./Header.module.scss";
import { useQuery, useMutation } from "@tanstack/react-query";

import { authService } from "@/api/services";
import headerLogo from "../../../public/images/easycare2.png";
import LoginBox from "./LoginBox";

const cx = cn.bind(styles);

const Header = () => {
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ["User"],
    queryFn: async () => {
      const response = await authService.getMyInfo();
      return response.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
    retry: 0,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => authService.logout(),
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      router.push("/login");
    },
  });

  return (
    <div className={cx("HeaderWrapper")}>
      <div className={cx("HeaderInn")}>
        <Link href="/" passHref legacyBehavior>
          <a className={cx("imageBox")}>
            <Image
              src={headerLogo}
              alt="EasyCare Logo"
              className={cx("logoIcon")}
              priority
            />
          </a>
        </Link>

        {isLoading ? (
          <div className={cx("loadingSkeleton")}>Loading...</div>
        ) : (
          <div className={cx("loginContainer")}>
            {!user ? (
              <Link href="/login" passHref legacyBehavior>
                <a className={cx("imageBox")}>
                  <Image
                    src="/images/login.png"
                    alt="관리자 로그인"
                    className={cx("loginIcon")}
                    width={24}
                    height={24}
                    priority
                  />
                  <span>관리자 로그인</span>
                </a>
              </Link>
            ) : (
              <LoginBox user={user} logoutMutation={logoutMutation} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
