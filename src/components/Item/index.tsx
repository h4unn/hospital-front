import cn from "classnames/bind";
import styles from "./Item.module.scss";

const cx = cn.bind(styles);

type ItemProps = {
  id?: string;
  title: string;
  description: string;
  price: number;
  selective?: string[];
  className?: string;
  onClick: (id: string) => void;
};

export default function Item(props: ItemProps) {
  const { id, title, description, price, selective, onClick } = props;
  return (
    <li className={cx("Item")} onClick={() => onClick(id)}>
      <div className={cx("ItemContent")}>
        <h3 className={cx("ItemTitle")}>{title}</h3>
        <p className={cx("ItemDescription")}>{description}</p>
        <p className={cx("ItemPrice")}>{price}</p>
        {selective && (
          <ol className={cx("ItemSelective")}>
            {selective.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        )}
      </div>
    </li>
  );
}
