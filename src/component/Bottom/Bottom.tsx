"use client";
import Image from "next/image";
import Link from "next/link";

import { FaInstagram } from "react-icons/fa";
import { SiTistory } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

import React from "react";
import cn from "classnames/bind";
import styles from "./Bottom.module.scss";

const cx = cn.bind(styles);

const Bottom = () => {
  return (
    <div className={cx("bottomWrapper")}>
      <div className={cx("logoContainer")}>
        <h2>
          <Link href="/">
            <Image
              src="/images/bottomLogo.png"
              alt=""
              className={cx("logoTitle")}
              width={100}
              height={100}
            />
          </Link>
        </h2>
      </div>
      <ul className={cx("snsContainer")}>
        <li>
          <Link href={"https://www.instagram.com/hyunnmi_222/"}>
            <FaInstagram />
          </Link>
        </li>
        <li>
          <Link href={"https://github.com/h4unn/"}>
            <FaGithub />
          </Link>
        </li>
        <li>
          <Link href={"https://h4un2.tistory.com/"}>
            <SiTistory />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Bottom;
