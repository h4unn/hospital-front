import React from "react";
import cn from "classnames/bind";
import styles from "./ReservationCheckUp.module.scss";

import { useCheckReservation } from "@/hook/refresh";
import { useReservationStore } from "@/store";
import { formatDate } from "@/utils/format";

import Input from "@/components/Input";
import KakaoPostPopUp from "@/components/KakaoPostPopUp/KakaoPostPopUp";
// import Button from "@/component/Button/Button";

const cx = cn.bind(styles);

type ReservationCheckUpViewProps = {
  productData: IProduct;
  userData: ILoginResponse;
};

const ReservationCheckUpView: React.FC<ReservationCheckUpViewProps> = ({
  productData,
  userData,
}) => {
  const reservation = useReservationStore((state) => state.userReservation);
  useCheckReservation();

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
          type="date"
          value={formatDate(reservation.reservationDate)}
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
    </form>
  );
};

export default ReservationCheckUpView;
