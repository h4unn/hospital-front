import React from "react";
import cn from "classnames/bind";
import styles from "./ReservationCheckUp.module.scss";

import * as yup from "yup";

import { useCheckReservation } from "@/hook/refresh";
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
}) => {
  const reservation = useReservationStore((state) => state.userReservation);
  useCheckReservation();

  // const schema = {
  //   name: yup.string().required("이름을 입력해주세요."),
  //   birth: yup.string().required("생년월일을 입력해주세요."),
  //   tell: yup.string().required("전화번호를 입력해주세요."),
  //   email: yup.string().email("유효한 이메일을 입력해주세요."),
  //   address: yup.string().required("주소를 입력해주세요."),
  // };

  const [address, setAddress] = React.useState("");
  const [postcode, setPostcode] = React.useState("");

  return (
    <form className={cx("ReservationCheckUp")}>
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
        />
        <Input label="성명" value={reservation.name} readOnly />
        <Input label="생년월일" value={reservation.birth} readOnly />
        <div className="GenderRadio">
          <label
            className={cx("UserTypeLabel", {
              // active: reservation.userType === "male",
            })}
          >
            <input type="radio" value="male" />
            <span>남성</span>
          </label>
          <label
            className={cx("UserTypeLabel", {
              // active: reservation.userType === "female",
            })}
          >
            <input type="radio" value="female" />
            <span>여성</span>
          </label>
        </div>
        <Input label="전화번호" value={reservation.tell} readOnly />
        <Input label="이메일" type="email" />

        <div className={cx("PostArea")}>
          <Input label="주소" value={address} readOnly />
          <Input label="상세주소" />
          <Input label="우편번호" value={postcode} readOnly />
          <KakaoPostPopUp setAddress={setAddress} setPostcode={setPostcode} />
        </div>
      </div>
      {productData.selective && (
        <div className={cx("SelectiveProduct")}>
          <h3>선택 상품</h3>
          <label>
            <input type="checkbox" />
            <span>{productData.selective.name}</span>
          </label>
        </div>
      )}

      <div className="PriceArea">
        <div className="PriceItem">
          <p>패키지비용</p>
          <p>{productData.price}</p>
        </div>
        <div className="PriceItem">
          <p>총 검진 비용</p>
          <p>{productData.price + (productData.selective?.price || 0)}</p>
        </div>
      </div>
      <Button
        type="submit"
        label={"건강검진 예약"}
        backgroundColor={"#FFEA3C"}
        borderColor={"#BFC662"}
      />
    </form>
  );
};

export default ReservationCheckUpView;
