"use client";

import React from "react";
import cn from "classnames/bind";
import styles from "./Reservation.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import medicareImage1 from "@/assets/medicar_1.png";
import medicareImage2 from "@/assets/medicar_2.png";
import { useReservationStore } from "@/store";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Section from "@/components/UI/Section";
import Input from "@/components/Input";
import Calander from "@/component/Calander/Calander";
import Button from "@/component/Button/Button";

const cx = cn.bind(styles);

const schema = yup.object().shape({
  userType: yup
    .mixed<ReservationFormData["userType"]>()
    .oneOf(["self", "auther"])
    .required("사용자 유형을 선택해주세요."),
  name: yup.string().required("이름을 입력해주세요."),
  birth: yup.string().required("생년월일을 입력해주세요."),
  tell: yup.string().required("전화번호를 입력해주세요."),
  reserveType: yup
    .mixed<ReservationFormData["reserveType"]>()
    .oneOf(["combined", "public"])
    .required("예약 유형을 선택해주세요."),
});

type ReservationFormData = {
  userType: "self" | "auther";
  name: string;
  birth: string;
  tell: string;
  reserveType: "combined" | "public";
};

const ReservationView: React.FC = () => {
  const setReservation = useReservationStore((state) => state.setReservation);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<ReservationFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      userType: "self",
      reserveType: "combined",
    },
  });

  const formValues = watch();

  const onSubmit = (data: ReservationFormData) => {
    setReservation({ ...data, reservation_date: selectedDate });
    router.push("/hospitalList");
  };

  return (
    <Section title="건강 검진 예약">
      <div className={cx("ReservationView")}>
        <Calander
          selectedDate={selectedDate}
          onDateSelect={(date) => setSelectedDate(date)}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cx("ReservationForm")}
        >
          <div className={cx("UserType")}>
            <h3>예약자 정보</h3>
            <p>
              검진 예약을 위한 최소한의 입력사항입니다. 예약하시는 분의 정보를
              입력해주세요.
            </p>
            <div className={cx("RadioArea")}>
              <label
                className={cx({
                  active: formValues.userType === "self",
                })}
              >
                <input type="radio" value="self" {...register("userType")} />
                본인 예약
              </label>
              <label
                className={cx({
                  active: formValues.userType === "auther",
                })}
              >
                <input type="radio" value="auther" {...register("userType")} />
                대리 예약
              </label>
            </div>
          </div>

          <div className={cx("UserInfo")}>
            <Input
              label="예약자명"
              required
              {...register("name")}
              error={errors.name}
            />
            <Input
              label="생년월일"
              required
              {...register("birth")}
              error={errors.birth}
            />
            <Input
              label="전화번호"
              required
              {...register("tell")}
              error={errors.tell}
            />
          </div>

          <div className={cx("ReserveType")}>
            <label
              className={cx("ReserveTypeLabel", {
                active: formValues.reserveType === "combined",
              })}
            >
              <span>종합검진</span>
              <Image
                src={medicareImage1}
                alt="예약조회"
                className={cx("loginIcon")}
                width={72}
                height={72}
              />
              <input
                type="radio"
                value="combined"
                {...register("reserveType")}
              />
            </label>
            <label
              className={cx("ReserveTypeLabel", {
                active: formValues.reserveType === "public",
              })}
            >
              <span>공단검진</span>
              <Image
                src={medicareImage2}
                alt="예약조회"
                className={cx("loginIcon")}
                width={72}
                height={72}
              />
              <input type="radio" value="public" {...register("reserveType")} />
            </label>
          </div>

          <Button
            label="예약하기"
            backgroundColor="#FFEA3C"
            borderColor="#BFC662"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            type="submit"
          />
        </form>
      </div>
    </Section>
  );
};

export default ReservationView;
