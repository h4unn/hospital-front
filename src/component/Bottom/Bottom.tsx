"use client";

import React from "react";
import cn from "classnames/bind";
import styles from "./Bottom.module.scss";

const cx = cn.bind(styles);

const Bottom = () => {
    return (
        <div className={cx("bottomWrapper")}>
            <div className={cx("logoContainer")}>
                <img
                    src="/images/bottomLogo.png"
                    alt=""
                    className={cx("logoTitle")}
                />
            </div>
            <div className={cx("snsContainer")}>
                <img src="/images/kakaotalk.png" alt="" />
                <img src="/images/insta.png" alt="" />
                <img src="/images/facebook.png" alt="" />
                <img src="/images/linkedin.png" alt="" />
            </div>
        </div>
    );
};

export default Bottom;
