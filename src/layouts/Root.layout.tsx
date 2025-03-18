"use client";
import React from "react";
import Head from "next/head";

import Header from "@/component/Header/Header";
import cn from "classnames/bind";
import styles from "@/layouts/Root.layout.module.scss";
import "../style/globals.css";
import Fab from "@/component/Fab/Fab";

const cx = cn.bind(styles);

export default function RootLayout(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <html lang="ko">
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>홈 페이지</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          name="description"
          content="EasyCare는 누구나 쉽게 이용할 수 있는 예약 서비스입니다."
        />
        <meta
          name="keywords"
          content="EasyCare, 예약, 예약 서비스, 예약 관리, 예약 시스템"
        />
        <meta name="author" content="EasyCare" />
        <meta property="og:title" content="EasyCare" />
        <meta
          property="og:description"
          content="EasyCare는 누구나 쉽게 이용할 수 있는 예약 서비스입니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EasyCare" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@EasyCare" />
        <meta name="twitter:title" content="EasyCare" />
      </Head>
      <body>
        <div className={cx("EasyCareWrapper")}>
          <Header />
          <div className={cx("EasyCareInn")}>{children}</div>
          <div className={cx("fablInn")}>
            <Fab />
          </div>
          {/* <Bottom /> */}
        </div>
      </body>
    </html>
  );
}
