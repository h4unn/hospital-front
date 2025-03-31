"use client";
import React from "react";
import cn from "classnames/bind";
import styles from "./ReservationCheckUp.module.scss";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import { useCheckReservation } from "@/hook/refresh";
import { useReservationStore } from "@/store";
import { formatDate } from "@/utils/format";

import Input from "@/components/Input";
import KakaoPostPopUp from "@/components/KakaoPostPopUp/KakaoPostPopUp";
import Button from "@/component/Button/Button";

const cx = cn.bind(styles);

type ReservationCheckUpViewProps = {
  productData: IProduct;
  userData: ILoginResponse;
  onSubmit: (data: orderRequestBody) => void;
};

const ReservationCheckUpView: React.FC<ReservationCheckUpViewProps> = ({
  productData,
  userData,
  onSubmit,
}) => {
  // useCheckReservation();
  const reservation = useReservationStore((state) => state.userReservation);

  const schema = yup.object().shape({
    name: yup.string().required("이름을 입력해주세요."),
    birth: yup.string().required("생년월일을 입력해주세요."),
    tell: yup.string().required("전화번호를 입력해주세요."),
    email: yup.string().email("유효한 이메일을 입력해주세요."),
    address: yup.object().shape({
      zipcode: yup.string().required("우편번호를 입력해주세요."),
      basic: yup.string().required("주소를 입력해주세요."),
      detail: yup.string().required("상세주소를 입력해주세요."),
    }),
    gender: yup.string().required("성별을 선택해주세요."),
    selectProduct: yup.boolean(),
    reservation_date: yup
      .date()
      .required("예약 날짜를 선택해주세요.")
      .typeError("유효한 날짜를 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [address, setAddress] = React.useState("");
  const [postcode, setPostcode] = React.useState("");

  return (
    <form
      className={cx("ReservationCheckUp")}
      onSubmit={handleSubmit((data) =>
        onSubmit({
          ...data,
          email: data.email || "",
          total_price:
            productData.price +
            (data.selectProduct ? productData.selective?.price || 0 : 0),
          productId: productData.id,
          hospitalId: userData.hospital._id || "",
        })
      )}
    >
      <div className={cx("HospitalInfo")}>
        <Input label={"선택 병원"} value={userData.name} readOnly />
        <Input
          label="선택 병원 주소"
          value={userData.hospital.address}
          readOnly
        />
        <Input label="검진 상품 선택" value={productData.name} readOnly />
        <p className={cx("ProductDescription")}>{productData.description}</p>
      </div>

      <div className={cx("UserInfo")}>
        <h3>예약자 정보</h3>
        <Input
          label="예약 희망 날짜"
          type="date"
          value={formatDate(reservation.reservation_date)}
          readOnly
          {...register("reservation_date")}
        />
        <Input
          label="성명"
          value={reservation.name}
          readOnly
          {...register("name")}
        />
        <Input
          label="생년월일"
          value={reservation.birth}
          readOnly
          {...register("birth")}
        />
        <div className="GenderRadio">
          <label className={cx("UserTypeLabel", {})}>
            <input type="radio" value="male" {...register("gender")} />
            <span>남성</span>
          </label>
          <label className={cx("UserTypeLabel", {})}>
            <input type="radio" value="female" {...register("gender")} />
            <span>여성</span>
          </label>
        </div>
        <Input
          label="전화번호"
          value={reservation.tell}
          readOnly
          {...register("tell")}
        />
        <Input label="이메일" type="email" {...register("email")} />

        <div className={cx("PostArea")}>
          <Input
            label="주소"
            value={address}
            readOnly
            {...register("address.basic")}
          />
          <Input label="상세주소" {...register("address.detail")} />
          <Input
            label="우편번호"
            value={postcode}
            readOnly
            {...register("address.zipcode")}
          />
          <KakaoPostPopUp setAddress={setAddress} setPostcode={setPostcode} />
        </div>
      </div>
      {productData.selective && (
        <div className={cx("SelectiveProduct")}>
          <h3>선택 상품</h3>
          <label>
            <input type="checkbox" {...register("selectProduct")} />
            <span>{productData.selective.name}</span>
          </label>
        </div>
      )}

      <div className={cx("PriceArea")}>
        <div className={cx("PriceItem")}>
          <p>패키지비용</p>
          <p>{productData.price.toLocaleString()}원</p>
        </div>

        <div className={cx("PriceItem", "Total")}>
          <p>총 검진 비용</p>
          <p>
            {(
              productData.price +
              (watch("selectProduct") ? productData.selective?.price || 0 : 0)
            ).toLocaleString()}
            원
          </p>
        </div>
      </div>
      <Button
        type="submit"
        label={"건강검진 예약"}
        backgroundColor={"#FFEA3C"}
        disabled={isSubmitting || Object.keys(errors).length > 0}
        borderColor={"#BFC662"}
      />
    </form>
  );
};

export default ReservationCheckUpView;
