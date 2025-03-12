"use client";

import React from "react";
import cn from "classnames/bind";
import styles from "./hospitalList.module.scss";

import Section from "@/components/UI/Section";
import Button from "@/component/Button/Button";

const cx = cn.bind(styles);

const HospitalView: React.FC = () => {
  return (
    <Section title="병원 리스트">
      <div className={cx("hospital-list")}>
        <div className={cx("hospital-item")}>
          <div className={cx("hospital-item__info")}>
            <h3>병원 이름</h3>
            <p>병원 설명</p>
          </div>
          <Button
            label="예약하기"
            backgroundColor={"#FFEA3C"}
            borderColor={"#BFC662"}
          />
        </div>
      </div>
    </Section>
  );
};

export default HospitalView;
