import cn from "classnames/bind";
import styles from "./Item.module.scss";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/api/services";

import Button from "@/component/Button/Button";

const cx = cn.bind(styles);

type hospitalType = {
  hospitalName: string;
  address: string;
  latitude?: string;
  longitude?: string;
  businessNumber: string;
};

type ItemProps = {
  id: string;
  title: string;
  hospitalId?: string;
  hospital?: hospitalType;
  description: string;
  price: number;
  selective?: { _id: string; name: string; price: number };
  className?: string;
  onClick: (id: string) => void;
};

export default function Item(props: ItemProps) {
  const { id, title, hospitalId, description, price, selective, onClick } =
    props;

  const { data: hospitalData } = useQuery({
    queryKey: ["hospital", hospitalId],
    queryFn: () =>
      hospitalId
        ? authService.getUserAdmin({ id: hospitalId })
        : Promise.reject("hospitalId is undefined"),
    enabled: !!hospitalId,
  });
  const handleCallHospital = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (hospitalInfo?.hospital.businessNumber) {
      if (isMobile) {
        window.location.href = `tel:${hospitalInfo.hospital.businessNumber.replace(
          /-/g,
          ""
        )}`;
      } else {
        alert(
          `전화번호: ${hospitalInfo.hospital.businessNumber}\n데스크톱에서는 직접 전화를 걸어주세요.`
        );
      }
      return;
    }

    // 전화번호가 없는 경우 처리
    alert("등록된 전화번호가 없습니다");
  };

  const handleOpenNaverMap = () => {
    const address = hospitalInfo?.hospital.address;
    const encodedAddress = address ? encodeURIComponent(address) : "";
    window.open(`https://map.naver.com/v5/search/${encodedAddress}`);
  };

  const { data: hospitalInfo } = hospitalData || {};

  return (
    <li className={cx("Item")}>
      <h3 className={cx("ItemTitle")}>{title}</h3>
      {hospitalInfo && (
        <p className={cx("ItemHospital")}>
          {hospitalInfo.hospital.hospitalName}
        </p>
      )}
      <p className={cx("ItemDescription")}>
        <span>{description}</span>
      </p>
      <p className={cx("ItemPrice")}>
        상품금액 <span>{price}</span>
      </p>
      {selective && <div className={cx("ItemSelective")}>{selective.name}</div>}
      <div className={cx("ItemButton")}>
        <Button
          label={"예약하기"}
          className={cx("ItemButtonText")}
          onClick={() => onClick(id)}
        />
        <Button label={"위치보기"} onClick={handleOpenNaverMap} />
        <Button label={"전화하기"} onClick={handleCallHospital} />
      </div>
    </li>
  );
}
