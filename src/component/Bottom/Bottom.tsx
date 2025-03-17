"use client";
import Image from "next/image";

import React from "react";
import cn from "classnames/bind";
import styles from "./Bottom.module.scss";

const cx = cn.bind(styles);

const Bottom = () => {
  return (
    <div className={cx("bottomWrapper")}>
      <div className={cx("logoContainer")}>
        <Image
          src="/images/bottomLogo.png"
          alt=""
          className={cx("logoTitle")}
        />
      </div>
      <div className={cx("snsContainer")}>
        <Image src="/images/kakaotalk.png" alt="" />
        <Image src="/images/insta.png" alt="" />
        <Image src="/images/facebook.png" alt="" />
        <Image src="/images/linkedin.png" alt="" />
      </div>
    </div>
  );
};

export default Bottom;
