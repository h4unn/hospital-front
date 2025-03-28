import cn from "classnames/bind";
import styles from "./Item.module.scss";

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
  hospital: hospitalType;
  description: string;
  price: number;
  selective?: { _id: string; name: string; price: number };
  className?: string;
  onClick: (id: string) => void;
};

export default function Item(props: ItemProps) {
  const { id, title, description, price, selective, hospital, onClick } = props;
  return (
    <li className={cx("Item")} onClick={() => onClick(id)}>
      <div className={cx("ItemContent")}>
        <h3 className={cx("ItemTitle")}>{title}</h3>
        <p className={cx("ItemHospital")}>{hospital.hospitalName}</p>
        <p className={cx("ItemDescription")}>{description}</p>
        <p className={cx("ItemPrice")}>{price}</p>
        {selective && (
          <div className={cx("ItemSelective")}>{selective.name}</div>
        )}
      </div>
    </li>
  );
}
