import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import cn from "classnames/bind";
import styles from "./Header.module.scss";
import { useQuery, useMutation } from "@tanstack/react-query";

import { authService } from "@/api/services";
import { useUser } from "@/store/user";
import headerLogo from "../../../public/images/easycare2.png";
import LoginBox from "./LoginBox";
import LoadingIndecator from "@/components/LoadingIndecator";

const cx = cn.bind(styles);

const Header = () => {
  const router = useRouter();
  const { user, logout } = useUser();

  const { data: userData, isLoading: userIsLoading } = useQuery({
    queryKey: ["User", user.name],
    queryFn: async () => {
      const response = await authService.getMyInfo(user.token);
      return response.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 0,
    enabled: !!user.token,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => authService.logout(),
    onSuccess: () => {
      logout();
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

        {userIsLoading ? (
          <LoadingIndecator />
        ) : (
          <div className={cx("loginContainer")}>
            {!userData ? (
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
              <LoginBox user={userData} logoutMutation={logoutMutation} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
