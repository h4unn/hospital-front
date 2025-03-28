import cn from "classnames/bind";
import styles from "./Header.module.scss";

import Link from "next/link";
import Button from "../Button/Button";

const cx = cn.bind(styles);

type LoginBoxProps = {
  user: ILoginResponse;
  logoutMutation: {
    mutate: () => void;
  };
};

const LoginBox: React.FC<LoginBoxProps> = ({ user, logoutMutation }) => {
  return (
    <ul className={cx("LoginBox")}>
      <li className={cx("User")}>
        안녕하세요. <span>{user.name}</span>님
      </li>
      <li>
        <Link href={"/product"} className={cx("ProductListBtn")}>
          상품조회
        </Link>
      </li>
      <li>
        <Link href={"/product/register"} className={cx("RegisterBtn")}>
          상품등록
        </Link>
      </li>
      <li>
        <Link href={"/reservation"} className={cx("ReservationBtn")}>
          예약조회
        </Link>
      </li>
      <li>
        <Button
          className={cx("LogoutBtn")}
          onClick={() => logoutMutation.mutate()}
          label={"로그아웃"}
        />
      </li>
    </ul>
  );
};

export default LoginBox;
