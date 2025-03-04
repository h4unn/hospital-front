"use client";
import React from "react";
import { Metadata } from "next";
import Header from "@/component/Header/Header";
import Bottom from "@/component/Bottom/Bottom";
import cn from "classnames/bind";
import styles from "@/layouts/Root.layout.module.scss";
import "../style/globals.css";
import Fab from "@/component/Fab/Fab";

const cx = cn.bind(styles);

export const metadata: Metadata = {
  title: "Hospital",
  description: "side project",
};

export default function RootLayout(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <html lang="ko">
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
